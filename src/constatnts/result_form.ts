export class ResutlForm {
  success: boolean;
  body: object;

  constructor(success: boolean, body: object) {
    this.success = success;
    this.body = body;
  }

  toMap() {
    return {
      success: this.success,
      body: this.body,
    };
  }
}
