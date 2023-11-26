export function generateRandomNumericString(): string {
    let result = '';
    const characters = '0123456789';
    const length = 5;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }