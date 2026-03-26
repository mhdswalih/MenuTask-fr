import React, { useState } from 'react';

// Types for menu and menu items
export type MenuItem = {
  id: string;
  name: string;
  description?: string;
};

export type MenuNode = {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
  children: MenuNode[];
};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const initialMenus: MenuNode[] = [
  {
    id: generateId(),
    name: 'Drinks',
    description: 'Refreshing beverages',
    items: [
      { id: generateId(), name: 'Coke', description: 'Chilled soft drink' },
      { id: generateId(), name: 'Orange Juice', description: 'Freshly squeezed' },
    ],
    children: [],
  },
  {
    id: generateId(),
    name: 'Food',
    description: 'Delicious meals',
    items: [
      { id: generateId(), name: 'Burger', description: 'Juicy beef burger' },
    ],
    children: [
      {
        id: generateId(),
        name: 'Brunch',
        description: 'Late morning meals',
        items: [
          { id: generateId(), name: 'Eggs Benedict', description: 'Classic brunch dish' },
        ],
        children: [],
      },
    ],
  },
];

const MenuManager: React.FC = () => {
  const [menus, setMenus] = useState<MenuNode[]>(initialMenus);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuDesc, setNewMenuDesc] = useState('');
  const [parentMenuId, setParentMenuId] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');

  // Recursive function to find a menu node by id
  function findMenuNode(nodes: MenuNode[], id: string): MenuNode | null {
    for (const node of nodes) {
      if (node.id === id) return node;
      const found = findMenuNode(node.children, id);
      if (found) return found;
    }
    return null;
  }

  // Recursive function to add a new menu node
  function addMenuNode(nodes: MenuNode[], parentId: string | null, newNode: MenuNode): MenuNode[] {
    if (!parentId) {
      return [...nodes, newNode];
    }
    return nodes.map(node => {
      if (node.id === parentId) {
        return { ...node, children: [...node.children, newNode] };
      }
      return { ...node, children: addMenuNode(node.children, parentId, newNode) };
    });
  }

  // Recursive function to add a menu item
  function addMenuItem(nodes: MenuNode[], menuId: string, item: MenuItem): MenuNode[] {
    return nodes.map(node => {
      if (node.id === menuId) {
        return { ...node, items: [...node.items, item] };
      }
      return { ...node, children: addMenuItem(node.children, menuId, item) };
    });
  }

  // Recursive function to render menu tree
  function renderMenuTree(nodes: MenuNode[], depth = 0) {
    return (
      <ul style={{ marginLeft: depth * 16 }}>
        {nodes.map(node => (
          <li key={node.id}>
            <button
              style={{ fontWeight: selectedMenuId === node.id ? 'bold' : 'normal' }}
              onClick={() => setSelectedMenuId(node.id)}
            >
              {node.name}
            </button>
            {node.children.length > 0 && renderMenuTree(node.children, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }

  // Handle menu creation
  function handleCreateMenu(e: React.FormEvent) {
    e.preventDefault();
    if (!newMenuName.trim()) return;
    const newNode: MenuNode = {
      id: generateId(),
      name: newMenuName,
      description: newMenuDesc,
      items: [],
      children: [],
    };
    setMenus(prev => addMenuNode(prev, parentMenuId, newNode));
    setNewMenuName('');
    setNewMenuDesc('');
    setParentMenuId(null);
  }

  // Handle item creation
  function handleCreateItem(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedMenuId || !newItemName.trim()) return;
    const newItem: MenuItem = {
      id: generateId(),
      name: newItemName,
      description: newItemDesc,
    };
    setMenus(prev => addMenuItem(prev, selectedMenuId, newItem));
    setNewItemName('');
    setNewItemDesc('');
  }

  // Find selected menu node
  const selectedMenu = selectedMenuId ? findMenuNode(menus, selectedMenuId) : null;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h2>Menu Management</h2>
      {/* Menu creation form */}
      <form onSubmit={handleCreateMenu} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Menu name"
          value={newMenuName}
          onChange={e => setNewMenuName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newMenuDesc}
          onChange={e => setNewMenuDesc(e.target.value)}
        />
        <select
          value={parentMenuId || ''}
          onChange={e => setParentMenuId(e.target.value || null)}
        >
          <option value="">Top-level menu</option>
          {/* Flat list of all menus for parent selection */}
          {flattenMenus(menus).map(menu => (
            <option key={menu.id} value={menu.id}>{menu.name}</option>
          ))}
        </select>
        <button type="submit">Add Menu</button>
      </form>

      {/* Menu tree */}
      <div>
        <h3>Menus</h3>
        {renderMenuTree(menus)}
      </div>

      {/* Menu item creation form */}
      {selectedMenu && (
        <form onSubmit={handleCreateItem} style={{ marginTop: 16 }}>
          <h4>Add item to: {selectedMenu.name}</h4>
          <input
            type="text"
            placeholder="Item name"
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newItemDesc}
            onChange={e => setNewItemDesc(e.target.value)}
          />
          <button type="submit">Add Item</button>
        </form>
      )}

      {/* Show selected menu items and children */}
      {selectedMenu && (
        <div style={{ marginTop: 24 }}>
          <h4>{selectedMenu.name} Items</h4>
          <ul>
            {selectedMenu.items.map(item => (
              <li key={item.id}><b>{item.name}</b> {item.description && <span>- {item.description}</span>}</li>
            ))}
          </ul>
          {selectedMenu.children.length > 0 && (
            <div>
              <h5>Sub-menus:</h5>
              <ul>
                {selectedMenu.children.map(child => (
                  <li key={child.id}>{child.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Helper to flatten all menus for parent selection
  function flattenMenus(nodes: MenuNode[]): MenuNode[] {
    let result: MenuNode[] = [];
    for (const node of nodes) {
      result.push(node);
      result = result.concat(flattenMenus(node.children));
    }
    return result;
  }
};

export default MenuManager;
