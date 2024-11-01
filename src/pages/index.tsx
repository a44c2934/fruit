import Card from "@/components/Card/Card";
import Box from "@/components/Layout/Box";
import Container from "@/components/Layout/Container";
import Main from "@/components/Layout/Main";
import Menu from "@/components/Layout/Menu";
import { FruitVegetable, IFruitVegetableItem } from "@/utils/data";
import Link from "next/link";
import { useRef, useState } from "react";
interface IData {
  default: IFruitVegetableItem[],
  fruit: IFruitVegetableItem[],
  vegetable: IFruitVegetableItem[],
}

export default function Home() {
  const timeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const [data, setData] = useState<IData>({
    default: [...FruitVegetable],
    fruit: [],
    vegetable: [],
  });

  const moveToCategory = (item: IFruitVegetableItem) => {
    const isFruit = item.type === "Fruit";

    setData((prevData) => ({
      default: prevData.default.filter((i) => i.name !== item.name),
      fruit: isFruit ? [...prevData.fruit, item] : prevData.fruit,
      vegetable: !isFruit ? [...prevData.vegetable, item] : prevData.vegetable,
    }));

    timeoutRef.current[item.name] = setTimeout(() => {
      setDefaultData(item);
      delete timeoutRef.current[item.name];
    }, 5000);
  };

  const returnToDefault = (item: IFruitVegetableItem) => {
    clearTimeout(timeoutRef.current[item.name]);
    delete timeoutRef.current[item.name];
    setDefaultData(item);
  };

  const setDefaultData = (item: IFruitVegetableItem) => {
    setData((prevData) => ({
      default: [...prevData.default, item],
      fruit: prevData.fruit.filter((i) => i.name !== item.name),
      vegetable: prevData.vegetable.filter((i) => i.name !== item.name),
    }));
  };

  const onClickFruitVegetable = (item: IFruitVegetableItem) => {
    if (data.default.some((i) => i.name === item.name)) {
      moveToCategory(item);
    } else {
      returnToDefault(item);
    }
  };

  return (
    <Container>
      <Menu>
        {data.default.map((item) => (
          <Card
            key={item.name}
            options={item}
            onClick={() => onClickFruitVegetable(item)}
          />
        ))}
        <Link href={"/department"}>
          Department
        </Link>
      </Menu>
      <Main>
        <Box title="Fruit">
          {data.fruit.map((item) => (
            <Card
              key={item.name}
              options={item}
              onClick={() => onClickFruitVegetable(item)}
            />
          ))}
        </Box>
        <Box title="Vegetable">
          {data.vegetable.map((item) => (
            <Card
              key={item.name}
              options={item}
              onClick={() => onClickFruitVegetable(item)}
            />
          ))}
        </Box>
      </Main>
    </Container>
  );
}
