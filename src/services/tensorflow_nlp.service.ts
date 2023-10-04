import * as tf from '@tensorflow/tfjs-node';  //uninstall if needless
import * as use from '@tensorflow-models/universal-sentence-encoder';

class Service {
  private model: use.UniversalSentenceEncoder | any;

  constructor() {
    this.model = null;
  }

  async initialize() {
    this.model = await use.load();
  }

  async analyzeText(text: string) {
    if (!this.model) {
      throw new Error('NLP service not initialized.');
    }

    // Analyze the text
    const embeddings = await this.model.embed(text);

    // Get the tensor data as a JavaScript array
    const embeddingArray = await embeddings.array();

    // You can now use the embeddings for further analysis or comparison

    return embeddingArray;
  }
}

export const tensorflowNlpService = new Service();
