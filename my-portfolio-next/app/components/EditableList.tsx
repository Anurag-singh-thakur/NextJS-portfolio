// app/components/EditableList.tsx
import React, { useEffect, useState } from 'react';

interface EditableListProps {
  title: string;
  storageKey: string;
}

const EditableList: React.FC<EditableListProps> = ({ title, storageKey }) => {
  const [listItems, setListItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const storedItems = localStorage.getItem(storageKey);
    if (storedItems) {
      setListItems(JSON.parse(storedItems));
    }
  }, [storageKey]);

  const addItem = () => {
    if (newItem) {
      const updatedItems = [...listItems, newItem];
      setListItems(updatedItems);
      localStorage.setItem(storageKey, JSON.stringify(updatedItems));
      setNewItem('');
    }
  };

  const deleteItem = (itemToDelete: string) => {
    const updatedItems = listItems.filter(item => item !== itemToDelete);
    setListItems(updatedItems);
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {listItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{item}</span>
            <button onClick={() => deleteItem(item)} >Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        className=""
        placeholder={`Add new ${title.toLowerCase()}`}
      />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default EditableList;