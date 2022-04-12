import { Fragment, useEffect, useState, useRef } from "react";
import styles from "./app.module.css";

const data = [
  { id: "1", value: "Item 1" },
  { id: "2", value: "Item 2" },
  { id: "3", value: "Item 3" },
  { id: "4", value: "Item 4" },
  { id: "5", value: "Item 5" },
  { id: "6", value: "Item 6" },
  { id: "7", value: "Item 7" },
  { id: "8", value: "Item 8" },
  { id: "9", value: "Item 9" },
  { id: "10", value: "Item 10" },
  { id: "11", value: "Item 11" },
];

export default function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [items, setItems] = useState(data);
  const [dragIndex, setDragIndex] = useState<null | number>(null);
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleDragEnter = (index: number) => setHoveredIndex(index);
  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDrop = () => {
    if (hoveredIndex === null || dragIndex === null) return;
    const copyItems = [...items];
    const hoveredItem = copyItems[hoveredIndex];
    const dragItem = copyItems[dragIndex];

    copyItems[hoveredIndex] = dragItem;
    copyItems[dragIndex] = hoveredItem;

    setItems(copyItems);
  };

  return (
    <main>
      <h1>Drag And Drop List</h1>

      <ul
        id="drop-target"
        className={styles.list}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={() => handleDrop()}
      >
        {items.map((item, i) => (
          <Fragment key={item.id}>
            <DraggableItem
              onDragStart={() => handleDragStart(i)}
              onDragEnter={() => handleDragEnter(i)}
            >
              {item.value}
            </DraggableItem>
          </Fragment>
        ))}
      </ul>
    </main>
  );
}

interface DraggableItemProps {
  onDragStart: () => void;
  onDragEnter: () => void;
  children: string;
}

const DraggableItem = ({
  onDragStart,
  onDragEnter,
  children,
}: DraggableItemProps) => {
  return (
    <li
      className={styles.item}
      draggable
      onDragStart={() => onDragStart()}
      onDragEnter={() => onDragEnter()}
    >
      {children}
    </li>
  );
};
