export type Product = {
  id?: string;           // Automatically Generated when product is added
  category: "DESKTOP" | "LAPTOP" | "MONITOR" | "KEYBOARD" | "MOUSE" | "BACKPACK" | null;
  brand: "SONNY" | "REVOLVO" | "COURSEAIR" | "H&P" | "MAK" | "LOGICHTE" | "AZES" | null;
  model: string | null;        // { Random String } - { Two Random Numbers }
  name: string | null;         // {Brand} {Model}
  price: number | null;        // Integer Value
  rating: number | null;       // 2-decimal float value. evaluated out of 5
  sold: number | null;         // Integer
};
