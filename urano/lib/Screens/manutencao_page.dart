import 'package:flutter/material.dart';
import '../Services/manutencaoService.dart';

class ManutencaoPage extends StatefulWidget {
  final String chave;

  ManutencaoPage(this.chave);

  @override
  _ManutencaoPageState createState() => _ManutencaoPageState();
}

class _ManutencaoPageState extends State<ManutencaoPage> {
  late List<bool> _expandedList;
  bool _showAllManutencoes = false;
  late Future<List<Manutencao>> _minhasManutencoes;
  late Future<List<Manutencao>> _todasManutencoes;
  late Future<List<Manutencao>> _manutencoesPendentes;
  late Future<List<Manutencao>> _manutencoesConcluidas;
  late Future<List<Manutencao>> _exibirManutencoes;

  // Controladores para os campos de texto
  TextEditingController encarregadoController = TextEditingController();
  TextEditingController tituloController = TextEditingController();
  TextEditingController tipoController = TextEditingController();
  TextEditingController descricaoController = TextEditingController();

  // Estado local para rastrear a prioridade selecionada
  String selectedPriority = 'alta';

  @override
  void initState() {
    super.initState();
    _expandedList = List.generate(10, (index) => false);
    _loadManutencoes();
  }

  _loadManutencoes() async {
    setState(() {
      _minhasManutencoes = ManutencaoService().getMinhasManutencoes(responsavel: widget.chave);
      _manutencoesPendentes = Future.value(ManutencaoService().getManutencoesPendentes());
      _todasManutencoes = ManutencaoService().getTodasManutencoes(responsavel: widget.chave);
      _manutencoesConcluidas = Future.value(ManutencaoService().getManutencoesConcluidas());
      _exibirManutencoes = _showAllManutencoes
          ? _todasManutencoes
          : _minhasManutencoes;
    });
  }

  Color _getPriorityColor(String priority) {
    switch (priority.toLowerCase()) {
      case 'alta':
        return Colors.red;
      case 'média':
        return Colors.yellow;
      case 'baixa':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  String getChamadosAtivosText() {
    return _showAllManutencoes ? 'Todos os chamados' : 'Chamados ativos';
  }

  String getDescricaoText() {
    return _showAllManutencoes
        ? 'Nesse campo você pode visualizar uma lista completa de todos os chamados registrados.'
        : 'Nesse campo você pode visualizar todos os que estão atribuídos a você';
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            'Manutenção',
            style: TextStyle(color: Colors.white),
          ),
          backgroundColor: Color(0xFF171717),
          centerTitle: true,
          bottom: TabBar(
            tabs: [
              Tab(text: 'Todos'),
              Tab(text: 'Atribuir'),
              Tab(text: 'Adicionar'),
              Tab(text: 'Concluídas'),
            ],
            indicator: BoxDecoration(
              border: Border(
                bottom: BorderSide(color: Colors.white, width: 2.0),
              ),
            ),
            labelStyle: TextStyle(fontSize: 12), // Ajuste o tamanho da fonte aqui
          ),
        ),
        backgroundColor: Color(0xFF282828),
        body: TabBarView(
          children: [
            buildManutencaoList(),

            // Tela "Atribuir"
            buildAtribuirScreen(),

            // Tela "Adicionar"
            buildAdicionarScreen(),

            // Tela "Concluídas"
            buildConcluidasScreen(),
          ],
        ),
      ),
    );
  }

  Widget buildManutencaoList() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(height: 16),
            Text(
              getChamadosAtivosText(),
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text(
              getDescricaoText(),
              style: TextStyle(
                color: Color(0xFF8B8B8B),
                fontSize: 12,
              ),
            ),
            SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Alterne a visualização de chamados',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                  ),
                ),
                Switch(
                  value: _showAllManutencoes,
                  onChanged: (value) {
                    setState(() {
                      _showAllManutencoes = value;
                      _loadManutencoes();
                    });
                  },
                  activeColor: Colors.green,
                  inactiveThumbColor: Colors.red,
                ),
              ],
            ),
            SizedBox(height: 16),
            FutureBuilder<List<Manutencao>>(
              future: _exibirManutencoes,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                    child: CircularProgressIndicator(),
                  );
                } else if (snapshot.hasError) {
                  return Center(
                    child: Text(
                      'Erro: ${snapshot.error}',
                      style: TextStyle(color: Colors.white),
                    ),
                  );
                } else {
                  List<Manutencao> manutencoes = snapshot.data ?? [];
                  _expandedList = List.generate(manutencoes.length, (index) => _expandedList.length > index ? _expandedList[index] : false);

                  return ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: manutencoes.length,
                    itemBuilder: (context, index) {
                      Manutencao manutencao = manutencoes[index];

                      return Column(
                        children: [
                          Card(
                            color: Color(0xFF171717),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            elevation: 5.0,
                            child: ListTile(
                              contentPadding: EdgeInsets.all(16.0),
                              leading: CircleAvatar(
                                backgroundColor: _getPriorityColor(manutencao.prioridade),
                                radius: 10,
                              ),
                              title: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Título: ${manutencao.titulo}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'Categoria: ${manutencao.categoria}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'Código: ${manutencao.codigo}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'Status: ${manutencao.status}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                ],
                              ),
                              subtitle: _expandedList[index]
                                  ? Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        SizedBox(height: 16),
                                        Text(
                                          'Descrição: ${manutencao.descricao}',
                                          style: TextStyle(color: Colors.white),
                                        ),
                                        SizedBox(height: 16),
                                        Text(
                                          'Encarregado: ${manutencao.responsavel}',
                                          style: TextStyle(color: Colors.white),
                                        ),
                                        SizedBox(height: 16),
                                        Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                          children: [
                                            if (manutencao.responsavel == widget.chave && manutencao.status == "Em Andamento")
                                              ElevatedButton(
                                                onPressed: () async {
                                                  print('Retornar Chamado');
                                                  ManutencaoService().retornarManutencao(codigo: manutencao.codigo);
                                                  _todasManutencoes = ManutencaoService().getTodasManutencoes(responsavel: widget.chave);
                                                  _minhasManutencoes = ManutencaoService().getMinhasManutencoes(responsavel: widget.chave);
                                                  setState(() {
                                                    _expandedList[index] = false;
                                                    _loadManutencoes();
                                                  });
                                                },
                                                style: ElevatedButton.styleFrom(
                                                  primary: Colors.transparent,
                                                  padding: EdgeInsets.symmetric(horizontal: 12),
                                                ),
                                                child: Text(
                                                  'Retornar',
                                                  style: TextStyle(color: Colors.white),
                                                ),
                                              ),
                                            if (manutencao.responsavel == widget.chave && manutencao.status == "Em Andamento")
                                              ElevatedButton(
                                                onPressed: () {
                                                  print('Concluir Chamado');
                                                  ManutencaoService().concluirManutencao(codigo: manutencao.codigo);
                                                  _todasManutencoes = ManutencaoService().getTodasManutencoes(responsavel: widget.chave);
                                                  _minhasManutencoes = ManutencaoService().getMinhasManutencoes(responsavel: widget.chave);
                                                  setState(() {
                                                    _expandedList[index] = false;
                                                    _loadManutencoes();
                                                  });
                                                },
                                                style: ElevatedButton.styleFrom(
                                                  primary: Colors.transparent,
                                                  padding: EdgeInsets.symmetric(horizontal: 12),
                                                ),
                                                child: Text(
                                                  'Concluir',
                                                  style: TextStyle(color: Colors.white),
                                                ),
                                              ),
                                          ],
                                        ),
                                      ],
                                    )
                                  : null,
                              onTap: () {
                                setState(() {
                                  _expandedList[index] = !_expandedList[index];
                                });
                              },
                            ),
                          ),
                          SizedBox(height: 16.0),
                        ],
                      );
                    },
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget buildAtribuirScreen() {
    // Lógica para a tela "Atribuir"
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(height: 16),
            Text(
              'Atribuir chamados',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Nesse campo você pode atribuir chamados para sua fila ou para outro funcionário.',
              style: TextStyle(
                color: Color(0xFF8B8B8B),
                fontSize: 12,
              ),
            ),
            SizedBox(height: 16.0),
            FutureBuilder<List<Manutencao>>(
              future: _manutencoesPendentes,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                    child: CircularProgressIndicator(),
                  );
                } else if (snapshot.hasError) {
                  return Center(
                    child: Text(
                      'Erro: ${snapshot.error}',
                      style: TextStyle(color: Colors.white),
                    ),
                  );
                } else {
                  List<Manutencao> manutencoes = snapshot.data ?? [];
                  _expandedList = List.generate(manutencoes.length, (index) => _expandedList.length > index ? _expandedList[index] : false);

                  return ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: manutencoes.length,
                    itemBuilder: (context, index) {
                      Manutencao manutencao = manutencoes[index];

                      return Column(
                        children: [
                          Card(
                            color: Color(0xFF171717),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            elevation: 5.0,
                            child: ListTile(
                              contentPadding: EdgeInsets.all(16.0),
                              leading: CircleAvatar(
                                backgroundColor: _getPriorityColor(manutencao.prioridade),
                                radius: 10,
                              ),
                              title: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Título: ${manutencao.titulo}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'Categoria: ${manutencao.categoria}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'Código: ${manutencao.codigo}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'Status: ${manutencao.status}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                ],
                              ),
                              subtitle: _expandedList[index]
                                  ? Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        SizedBox(height: 16),
                                        Text(
                                          'Descrição: ${manutencao.descricao}',
                                          style: TextStyle(color: Colors.white),
                                        ),
                                        SizedBox(height: 16),
                                        Text(
                                          'Encarregado: ${manutencao.responsavel}',
                                          style: TextStyle(color: Colors.white),
                                        ),
                                        SizedBox(height: 16),
                                        Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                          children: [
                                            ElevatedButton(
                                              onPressed: () {
                                                showDialog(
                                                  context: context,
                                                  builder: (BuildContext context) {
                                                    TextEditingController responsavelController = TextEditingController();
                                                    
                                                    return Theme(
                                                      data: ThemeData.dark(),
                                                      child: AlertDialog(
                                                        title: Text('Atribuir Responsável', style: TextStyle(color: Colors.white)),
                                                        content: Column(
                                                          children: [
                                                            Text('Insira a chave do responsável:', style: TextStyle(color: Colors.white)),
                                                            TextField(
                                                              controller: responsavelController,
                                                              style: TextStyle(color: Colors.black), // Cor do texto inserido
                                                              decoration: InputDecoration(
                                                                filled: true,
                                                                fillColor: Colors.white, // Cor do fundo da caixa de texto
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                        backgroundColor: Color(0xFF171717),
                                                        actions: [
                                                          ElevatedButton(
                                                            onPressed: () {
                                                              ManutencaoService().AtribuirManutencao(codigo: manutencao.codigo, responsavel: responsavelController.text);
                                                              Navigator.of(context).pop(); // Fechar o popup
                                                              _todasManutencoes = ManutencaoService().getTodasManutencoes(responsavel: widget.chave);
                                                              _minhasManutencoes = ManutencaoService().getMinhasManutencoes(responsavel: widget.chave);
                                                              _manutencoesPendentes = ManutencaoService().getManutencoesPendentes();
                                                              _manutencoesConcluidas = ManutencaoService().getManutencoesConcluidas();
                                                              setState(() {
                                                                _expandedList[index] = false;
                                                                _loadManutencoes();
                                                              });
                                                            },
                                                            style: ElevatedButton.styleFrom(
                                                              primary: Colors.white,
                                                              padding: EdgeInsets.symmetric(horizontal: 12), // Cor do botão Atribuir
                                                            ),
                                                            child: Text('Concluir', style: TextStyle(color: Color(0xFF171717))),
                                                          ),
                                                        ],
                                                      ),
                                                    );
                                                  },
                                                );
                                              },
                                              style: ElevatedButton.styleFrom(
                                                primary: Colors.transparent,
                                                padding: EdgeInsets.symmetric(horizontal: 12),
                                              ),
                                              child: Text('Atribuir', style: TextStyle(color: Colors.white)),
                                            ),
                                          ],
                                        ),
                                      ],
                                    )
                                  : null,
                              onTap: () {
                                setState(() {
                                  _expandedList[index] = !_expandedList[index];
                                });
                              },
                            ),
                          ),
                          SizedBox(height: 16.0),
                        ],
                      );
                    },
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }

Widget buildAdicionarScreen() {
  return SingleChildScrollView(
    child: Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Adicionar um novo chamado',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  'Nesse campo você pode adicionar um chamado para a lista de chamados',
                  style: TextStyle(
                    fontSize: 12,
                    color: const Color(0xFF8B8B8B),
                  ),
                )
              ],
            ),
          ),
          // Adicionando os campos de texto com estilo personalizado
          SizedBox(height: 16),
          TextField(
            controller: encarregadoController,
            decoration: InputDecoration(
              labelText: 'Encarregado',
              labelStyle: TextStyle(color: Colors.white),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF171717)),
                borderRadius: BorderRadius.circular(10.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF171717)),
                borderRadius: BorderRadius.circular(10.0),
              ),
              fillColor: Color(0xFF171717),
              filled: true,
            ),
            style: TextStyle(color: Colors.white),
          ),
          SizedBox(height: 16),
          TextField(
            controller: tituloController,
            decoration: InputDecoration(
              labelText: 'Título',
              labelStyle: TextStyle(color: Colors.white),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF171717)),
                borderRadius: BorderRadius.circular(10.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF171717)),
                borderRadius: BorderRadius.circular(10.0),
              ),
              fillColor: Color(0xFF171717),
              filled: true,
            ),
            style: TextStyle(color: Colors.white),
          ),
          SizedBox(height: 16),
          TextField(
            controller: tipoController,
            decoration: InputDecoration(
              labelText: 'Tipo',
              labelStyle: TextStyle(color: Colors.white),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF171717)),
                borderRadius: BorderRadius.circular(10.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF171717)),
                borderRadius: BorderRadius.circular(10.0),
              ),
              fillColor: Color(0xFF171717),
              filled: true,
            ),
            style: TextStyle(color: Colors.white),
          ),
          SizedBox(height: 16),
          TextField(
            controller: descricaoController,
            minLines: 3, // Defina o valor desejado para aumentar a altura
            maxLines: null, // Permite várias linhas
            keyboardType: TextInputType.multiline,
            decoration: InputDecoration(
              labelText: 'Descrição',
              labelStyle: TextStyle(color: Colors.white),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF171717)),
                borderRadius: BorderRadius.circular(10.0),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF171717)),
                borderRadius: BorderRadius.circular(10.0),
              ),
              fillColor: Color(0xFF171717),
              filled: true,
            ),
            style: TextStyle(color: Colors.white),
          ),

          // Adicionando o texto 'Prioridade'
          SizedBox(height: 16),
          Text(
            'Prioridade:',
            style: TextStyle(color: Colors.white),
          ),

          // Adicionando os radio buttons
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Radio(
                value: 'Alta',
                groupValue: selectedPriority,
                onChanged: (value) {
                  setState(() {
                    selectedPriority = value.toString();
                  });
                },
                activeColor: Colors.white,
              ),
              Text('Alta', style: TextStyle(color: Colors.white)),
              Radio(
                value: 'Média',
                groupValue: selectedPriority,
                onChanged: (value) {
                  setState(() {
                    selectedPriority = value.toString();
                  });
                },
                activeColor: Colors.white,
              ),
              Text('Média', style: TextStyle(color: Colors.white)),
              Radio(
                value: 'Baixa',
                groupValue: selectedPriority,
                onChanged: (value) {
                  setState(() {
                    selectedPriority = value.toString();
                  });
                },
                activeColor: Colors.white,
              ),
              Text('Baixa', style: TextStyle(color: Colors.white)),
            ],
          ),

          // Adicionando o botão 'Continuar'
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              // Lógica para continuar, por exemplo, enviar os dados para o servidor
              print('Encarregado: ${encarregadoController.text}');
              print('Título: ${tituloController.text}');
              print('Tipo: ${tipoController.text}');
              print('Descrição: ${descricaoController.text}');
              print('Prioridade: $selectedPriority');
              print('Usuário logado: ${widget.chave}');

              ManutencaoService().adicionarManutencao(
                titulo: tituloController.text,
                descricao: descricaoController.text,
                prioridade: selectedPriority, 
                categoria: tipoController.text, 
                solicitante: widget.chave, 
                responsavel: encarregadoController.text);

              _todasManutencoes = ManutencaoService().getTodasManutencoes(responsavel: widget.chave);
              _minhasManutencoes = ManutencaoService().getMinhasManutencoes(responsavel: widget.chave);
              
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return Theme(
                    data: ThemeData.dark(),  // Usar o tema escuro para o AlertDialog
                    child: AlertDialog(
                      title: Text(
                        'Sucesso',
                        style: TextStyle(color: Colors.white),
                      ),
                      content: Text(
                        'A manutenção foi adicionada com sucesso!',
                        style: TextStyle(color: Colors.white),
                      ),
                      backgroundColor: Color(0xFF171717),  // Definir a cor de fundo desejada
                      actions: [
                        TextButton(
                          onPressed: () {
                            encarregadoController.clear();
                            tituloController.clear();
                            tipoController.clear();
                            descricaoController.clear();
                            Navigator.of(context).pop(); // Fechar o popup
                          },
                          child: Text(
                            'OK',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              );
              
            },
            style: ElevatedButton.styleFrom(
              primary: Colors.white,
              minimumSize: Size(40, 40),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              )
            ),
            child: Text(
              'Continuar',
              style: TextStyle(color: Color(0xFF171717))
            ),
          ),
        ],
      ),
    ),
  );
}



  Widget buildConcluidasScreen() {
    // Lógica para a tela "Concluídas"
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(height: 16),
            Text(
              'Chamados concluídos',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Nesse campo você pode visualizar todos os chamados que você finalizou em um período de um mês',
              style: TextStyle(
                color: Color(0xFF8B8B8B),
                fontSize: 12,
              ),
            ),
            SizedBox(height: 16.0),
            FutureBuilder<List<Manutencao>>(
              future: _manutencoesConcluidas,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                    child: CircularProgressIndicator(),
                  );
                } else if (snapshot.hasError) {
                  return Center(
                    child: Text(
                      'Erro: ${snapshot.error}',
                      style: TextStyle(color: Colors.white),
                    ),
                  );
                } else {
                  List<Manutencao> manutencoes = snapshot.data ?? [];
                  _expandedList = List.generate(manutencoes.length, (index) => _expandedList.length > index ? _expandedList[index] : false);

                  return ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: manutencoes.length,
                    itemBuilder: (context, index) {
                      Manutencao manutencao = manutencoes[index];

                      return Column(
                        children: [
                          Card(
                            color: Color(0xFF171717),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                            elevation: 5.0,
                            child: ListTile(
                              contentPadding: EdgeInsets.all(16.0),
                              leading: CircleAvatar(
                                backgroundColor: _getPriorityColor(manutencao.prioridade),
                                radius: 10,
                              ),
                              title: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Título: ${manutencao.titulo}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'Categoria: ${manutencao.categoria}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'Código: ${manutencao.codigo}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'Status: ${manutencao.status}',
                                    style: TextStyle(color: Colors.white),
                                  ),
                                ],
                              ),
                              subtitle: _expandedList[index]
                                  ? Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        SizedBox(height: 16),
                                        Text(
                                          'Descrição: ${manutencao.descricao}',
                                          style: TextStyle(color: Colors.white),
                                        ),
                                        SizedBox(height: 16),
                                        Text(
                                          'Encarregado: ${manutencao.responsavel}',
                                          style: TextStyle(color: Colors.white),
                                        ),
                                        SizedBox(height: 16),
                                        Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                          children: [
                                            ElevatedButton(
                                              onPressed: () {
                                                print('Retomar Chamado');
                                                ManutencaoService().retomarManutencao(codigo: manutencao.codigo);
                                                _todasManutencoes = ManutencaoService().getTodasManutencoes(responsavel: widget.chave);
                                                _minhasManutencoes = ManutencaoService().getMinhasManutencoes(responsavel: widget.chave);
                                                _manutencoesConcluidas = ManutencaoService().getManutencoesConcluidas();
                                                setState(() {
                                                  _expandedList[index] = false;
                                                  _loadManutencoes();
                                                });
                                              },
                                              style: ElevatedButton.styleFrom(
                                                primary: Colors.transparent,
                                                padding: EdgeInsets.symmetric(horizontal: 12),
                                              ),
                                              child: Text(
                                                'Retomar',
                                                style: TextStyle(color: Colors.white),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    )
                                  : null,
                              onTap: () {
                                setState(() {
                                  _expandedList[index] = !_expandedList[index];
                                });
                              },
                            ),
                          ),
                          SizedBox(height: 16.0),
                        ],
                      );
                    },
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
