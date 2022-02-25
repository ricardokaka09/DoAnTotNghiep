export class TransformJson {
  to(value: string) {
    if (!value) {
      return null;
    }

    return JSON.stringify(value);
  }
  from(value: any) {
    if (!value) {
      return null;
    }
    return value;
  }
}
