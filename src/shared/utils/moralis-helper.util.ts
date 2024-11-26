import axios from 'axios';

export class MoralisHelper {
  static async getPrice(tokenAddress: string): Promise<number> {
    const apiKey = process.env.MORALIS_API_KEY;
    const baseUrl = 'https://deep-index.moralis.io/api/v2.2/erc20';
    const url = `${baseUrl}/${tokenAddress}/price`;
    console.log('the url', url);

    try {
      const response = await axios.get(url, {
        headers: { 'X-API-Key': apiKey },
      });
      return response.data.usdPriceFormatted;
    } catch (error) {
      console.log('moralis error', error);

      console.error(`Error fetching price from Moralis: ${error.message}`);
      throw error;
    }
  }
}
