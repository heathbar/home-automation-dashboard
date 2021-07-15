
export function OnChange(callback) {
  const cachedKeyValue = Symbol();
  return (target, key) => {
    Object.defineProperty(target, key, {
      set(value) {
        if (this[cachedKeyValue] === value) {
          return;
        }
        this[cachedKeyValue] = value;
        callback.call(this, value);
      },
      get() {
        return this[cachedKeyValue];
      }
    });
  };
}
