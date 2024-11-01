import { useRef, useState } from "react";
export interface IFruitVegetableItem {
  type: string;
  name: string;
}
interface IData {
  default: IFruitVegetableItem[],
  fruit: IFruitVegetableItem[],
  vegetable: IFruitVegetableItem[],
}

export default function Home() {

  const [data, setData] = useState<IData>({
    default: [{
      type: "Fruit",
      name: "Apple",
    }, {
      type: "Vegetable",
      name: "Broccoli",
    }],
    fruit: [],
    vegetable: [],
  });

  // Ref to store timeouts for each item
  const timeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const onClickFruitVegetable = (item: IFruitVegetableItem) => {
    setData((prevData) => {
      // Check if the item is in the default list
      if (prevData.default.some((i) => i.name === item.name)) {
        const isFruit = item.type === "Fruit";

        // Move the item to the appropriate category and remove from default
        const newData = {
          ...prevData,
          default: prevData.default.filter((i) => i.name !== item.name),
          fruit: isFruit ? [...prevData.fruit, item] : prevData.fruit,
          vegetable: !isFruit ? [...prevData.vegetable, item] : prevData.vegetable,
        };

        // Set timeout to move the item back to default after 5 seconds
        timeoutRef.current[item.name] = setTimeout(() => {
          setData((currentData) => {
            // Only add back to default if the item is no longer in fruit or vegetable
            if (
              !currentData.default.some((i) => i.name === item.name) &&
              (currentData.fruit.some((i) => i.name === item.name) ||
                currentData.vegetable.some((i) => i.name === item.name))
            ) {
              return {
                ...currentData,
                default: [...currentData.default, item],
                fruit: isFruit ? currentData.fruit.filter((i) => i.name !== item.name) : currentData.fruit,
                vegetable: !isFruit ? currentData.vegetable.filter((i) => i.name !== item.name) : currentData.vegetable,
              };
            }
            return currentData;
          });
          delete timeoutRef.current[item.name]; // Clear the timeout reference
        }, 5000);

        return newData;
      } else {
        // If item is in fruit or vegetable, move back to default immediately
        clearTimeout(timeoutRef.current[item.name]); // Clear any pending timeout
        delete timeoutRef.current[item.name]; // Remove timeout reference

        return {
          ...prevData,
          default: [...prevData.default, item],
          fruit: prevData.fruit.filter((i) => i.name !== item.name),
          vegetable: prevData.vegetable.filter((i) => i.name !== item.name),
        };
      }
    });
  };
  console.log("data :", data)
  return (
    <div>
      {data.default.map((item) => (
        <div
          key={item.name}
          onClick={() => onClickFruitVegetable({ ...item })}
        >
          {item.name}
        </div>
      ))}

      {data.fruit.map((item) => (
        <div
          key={item.name}
          onClick={() => onClickFruitVegetable({ ...item })}
        >
          {item.name}
        </div>
      ))}

      {data.vegetable.map((item) => (
        <div
          key={item.name}
          onClick={() => onClickFruitVegetable({ ...item })}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
