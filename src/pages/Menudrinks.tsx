import { useState, useEffect } from "react";

// Asset URLs from Figma
import imgBg from '../assets/aefd7aa0f81b6208cb3da0f5ecc0f0d109ca4bd0.jpg'
import gapImg from '../assets/0571aff9d875fd6fec8f3801ba095cc39be0e4b1.png'
import menuBG from '../assets/53f3e533f37f4a258b3eea846bf145fb95b71dfd.png'
const imgMenuBg = "https://www.figma.com/api/mcp/asset/2a9c184e-8e70-455c-adae-4162e2da6ab6";
const imgLogo = "https://www.figma.com/api/mcp/asset/ea4d39fc-a133-4c77-ac41-08d2175c4f49";
const imgAppetizer = "https://www.figma.com/api/mcp/asset/1e91fb57-da9a-4215-a785-d288c223d986";
const imgCuttingBoard = "https://www.figma.com/api/mcp/asset/b3a70424-473c-4143-b4f6-3ac67dd04290";
const imgSaladPlate = "https://www.figma.com/api/mcp/asset/2acdebe4-a310-49ef-95b5-8c2c4b94d691";
const imgSaladBottom = "https://www.figma.com/api/mcp/asset/2f34651a-2135-4542-a309-2916f7ce8736";

// Decorative food icons
const iconShrimp = "https://www.figma.com/api/mcp/asset/0db24520-872e-4568-8f72-0df394fa6f75";
const iconChampagne = "https://www.figma.com/api/mcp/asset/376cb276-e50e-4e53-ae92-91ad074c4233";
const iconBarbecue = "https://www.figma.com/api/mcp/asset/cc0dd261-92a0-493c-b623-08f712160a66";
const iconBeer = "https://www.figma.com/api/mcp/asset/398d343f-dd70-45b6-a42a-8b1bdef30782";
const iconPizza = "https://www.figma.com/api/mcp/asset/565de879-3fc4-4347-8d4b-91f609e5d952";
const iconFastFood = "https://www.figma.com/api/mcp/asset/17635547-e7c3-4c34-995b-6c195c33f978";
const iconChampagneL = "https://www.figma.com/api/mcp/asset/2fce82f8-3f41-46a3-98e1-9ba717c2914b";
const iconBarbecueL = "https://www.figma.com/api/mcp/asset/2e56dfd0-7b94-444f-a747-014641626c1b";
const iconSpatula = "https://www.figma.com/api/mcp/asset/a67a7a15-c46e-4247-8994-b4adedd19e1f";
const iconFish = "https://www.figma.com/api/mcp/asset/34f418a2-1dbb-4e78-a801-2b8c25bae3b7";

// Footer social icons
const iconFacebook = "https://www.figma.com/api/mcp/asset/5e305d39-0413-4aa5-9c95-82362120abc6";
const iconTwitter = "https://www.figma.com/api/mcp/asset/5b3a6834-5241-4c8b-9ff2-498abc698489";
const iconPhone = "https://www.figma.com/api/mcp/asset/9c69a009-dbbc-43e2-a4d2-d9c3e165d3b1";
const iconEmail = "https://www.figma.com/api/mcp/asset/5b4f93e1-ef71-4964-9b56-ee5676fd484d";
const iconPin = "https://www.figma.com/api/mcp/asset/fb6c3872-48b9-4d37-a51f-bc245b786761";
const iconInstagram = "https://www.figma.com/api/mcp/asset/f143a4df-41dd-4c6d-8bb6-92531ee1186d";



interface MenuItem {
  id: string;
  name: string;
  desc?: string;
  price?: string;
}

interface SideMenu {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
  badgeColor: string;
  textShadow: string;
  image?: string;
}

interface Menu {
  id: string;
  name: string;
  items: MenuItem[];
  sideMenus: SideMenu[];
  decorationType?: string;
}

const openingHours = [
  { days: "MONDAY- THURSDAY", hours: "12 PM–12 AM" },
  { days: "FRIDAY-SATURDAY", hours: "12 PM–01 AM" },
  { days: "SUNDAY", hours: "12 PM–11 PM" },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"menu" | "item" | "sidemenu">("item");
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [selectedSideMenu, setSelectedSideMenu] = useState<SideMenu | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    itemName: "",
    itemDesc: "",
    itemPrice: "",
    badgeColor: "bg-[#d25858]",
    textShadow: "text-shadow-red",
    decorationType: "salad",
    sideMenuImage: ""
  });

  // State for menus
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch menus on component mount
  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch("http://localhost:3000/menu");
      const data = await res.json();
      
      const transformedMenus = data.map((menu:any)=>({

 id: menu.id,

 name: menu.name.toUpperCase(),

 items: menu.items || [],

 sideMenus: menu.children?.map((sub:any)=>({

  id: sub.id,

  name: sub.name.toUpperCase(),

  description: sub.description || "",

  items: sub.items || [],

  badgeColor: "bg-[#d25858]",

  textShadow: "text-shadow-red",

  image: imgSaladPlate

 })) || [],

 decorationType: "salad"

}))
      setMenus(transformedMenus);
      if (transformedMenus.length > 0) {
        setActiveTab(transformedMenus[0].id);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching menus:", err);
      setLoading(false);
    }
  };

  const openMenuModal = () => {
    setModalType("menu");
    setFormData({
      name: "",
      description: "",
      price: "",
      itemName: "",
      itemDesc: "",
      itemPrice: "",
      badgeColor: "bg-[#d25858]",
      textShadow: "text-shadow-red",
      decorationType: "salad",
      sideMenuImage: ""
    });
    setIsModalOpen(true);
  };

  const openItemModal = (menu: Menu, item?: MenuItem) => {
    setModalType("item");
    setSelectedMenu(menu);
    setFormData({
      name: "",
      description: "",
      price: "",
      itemName: item?.name || "",
      itemDesc: item?.desc || "",
      itemPrice: item?.price || "",
      badgeColor: "",
      textShadow: "",
      decorationType: "salad",
      sideMenuImage: ""
    });
    setIsModalOpen(true);
  };

  const openSideMenuModal = (menu: Menu, sideMenu?: SideMenu) => {
    setModalType("sidemenu");
    setSelectedMenu(menu);
    setSelectedSideMenu(sideMenu || null);
    setFormData({
      name: sideMenu?.name || "",
      description: sideMenu?.description || "",
      price: "",
      itemName: "",
      itemDesc: "",
      itemPrice: "",
      badgeColor: sideMenu?.badgeColor || "bg-[#d25858]",
      textShadow: sideMenu?.textShadow || "text-shadow-red",
      decorationType: "salad",
      sideMenuImage: sideMenu?.image || ""
    });
    setIsModalOpen(true);
  };

  const openSideMenuItemModal = (menu: Menu, sideMenu: SideMenu, item?: MenuItem) => {
    setModalType("item");
    setSelectedMenu(menu);
    setSelectedSideMenu(sideMenu);
    setFormData({
      name: "",
      description: "",
      price: "",
      itemName: item?.name || "",
      itemDesc: item?.desc || "",
      itemPrice: item?.price || "",
      badgeColor: "",
      textShadow: "",
      decorationType: "salad",
      sideMenuImage: ""
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
    setSelectedSideMenu(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      itemName: "",
      itemDesc: "",
      itemPrice: "",
      badgeColor: "",
      textShadow: "",
      decorationType: "salad",
      sideMenuImage: ""
    });
  };

  const handleAddMenu = async () => {
    if (!formData.name.trim()) {
      alert("Please enter menu name");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name.toUpperCase(),
          description: formData.description,
          parentId: null
        })
      });

      const newMenu = await res.json();

      const formattedMenu = {
        id: newMenu.id,
        name: newMenu.name,
        items: [],
        sideMenus: [],
        decorationType: formData.decorationType
      };

      setMenus([...menus, formattedMenu]);
      setActiveTab(newMenu.id);
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error creating menu");
    }
  };

  const handleAddItem = async () => {
    if (!formData.itemName.trim() || !selectedMenu) {
      alert("Please enter item name");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/menu/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.itemName,
          description: formData.itemDesc,
          price: formData.itemPrice,
          menuId: selectedSideMenu ? selectedSideMenu.id : selectedMenu.id
        })
      });

      const newItem = await res.json();

      const formattedItem = {
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        desc: newItem.description
      };

      if (selectedSideMenu) {
        const updateMenus = menus.map(menu => {
          if (menu.id === selectedMenu.id) {
            return {
              ...menu,
              sideMenus: menu.sideMenus.map(sm => {
                if (sm.id === selectedSideMenu.id) {
                  return {
                    ...sm,
                    items: [...sm.items, formattedItem]
                  };
                }
                return sm;
              })
            };
          }
          return menu;
        });
        setMenus(updateMenus);
      } else {
        const updateMenus = menus.map(menu => {
          if (menu.id === selectedMenu.id) {
            return {
              ...menu,
              items: [...menu.items, formattedItem]
            };
          }
          return menu;
        });
        setMenus(updateMenus);
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error creating item");
    }
  };

  const handleAddSideMenu = async () => {
    if (!formData.name.trim() || !selectedMenu) {
      alert("Please enter side menu name");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/menu/submenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name.toUpperCase(),
          description: formData.description,
          parentId: selectedMenu.id
        })
      });

      const newSideMenu = await res.json();

      const formattedSideMenu = {
        id: newSideMenu.id,
        name: newSideMenu.name,
        description: newSideMenu.description,
        badgeColor: formData.badgeColor,
        textShadow: formData.textShadow,
        image: formData.sideMenuImage || imgSaladPlate,
        items: []
      };

      const updateMenus = menus.map(menu => {
        if (menu.id === selectedMenu.id) {
          return {
            ...menu,
            sideMenus: [...menu.sideMenus, formattedSideMenu]
          };
        }
        return menu;
      });

      setMenus(updateMenus);
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error creating submenu");
    }
  };

  const handleSubmit = () => {
    if (modalType === "menu") {
      handleAddMenu();
    } else if (modalType === "sidemenu") {
      handleAddSideMenu();
    } else if (modalType === "item") {
      handleAddItem();
    }
  };

  const renderDecoration = (menu: Menu) => {
    if (menu.decorationType === "salad") {
      return (
        <div className="relative mt-20 pl-3 sm:pl-4 pb-2">
          <img src={imgSaladBottom} alt=""
            className="relative md:absolute md:-left-10 md:-bottom-10 w-[80px] sm:w-[100px] md:w-[140px] lg:w-[180px] h-[50px] sm:h-[60px] md:h-[100px] lg:h-[120px] object-cover rounded shadow-lg z-10" />
        </div>
      );
    } else if (menu.decorationType === "drinks") {
      return (
        <div className="relative mt-20 pl-3 sm:pl-4 pb-2">
          <img src={iconChampagneL} alt=""
            className="relative md:absolute md:-left-10 md:-bottom-10 w-[60px] sm:w-[80px] md:w-[110px] lg:w-[140px] h-[60px] sm:h-[80px] md:h-[110px] lg:h-[140px] object-contain opacity-50 z-10" />
        </div>
      );
    } else if (menu.decorationType === "brunch") {
      return (
        <div className="relative mt-20 pl-3 sm:pl-4 pb-2">
          <img src={iconSpatula} alt=""
            className="relative md:absolute md:-left-10 md:-bottom-10 w-[60px] sm:w-[80px] md:w-[110px] lg:w-[140px] h-[60px] sm:h-[80px] md:h-[110px] lg:h-[140px] object-contain opacity-50 z-10" />
        </div>
      );
    }
    return null;
  };

  const renderSideMenu = (sideMenu: SideMenu, parentMenu: Menu) => {
    return (
      <div key={sideMenu.id} className="mt-4 sm:mt-6 mx-3 sm:mx-4 md:mx-6 lg:mx-8 md:ml-20 lg:ml-30 border border-dashed border-white/50 rounded-sm">
        <div className="flex flex-col sm:flex-row min-h-auto sm:min-h-[180px]">
          <div className="flex flex-col items-center justify-center w-full sm:w-[250px] lg:w-[280px] sm:shrink-0 gap-2 py-4 sm:py-5 border-b sm:border-b-0">
            <div className={`${sideMenu.badgeColor} px-4 sm:px-5 md:px-6 py-1.5 sm:py-2`}>
              <span className="font-oswald text-white font-bold text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] uppercase tracking-[1.5px]"
                style={{ textShadow: sideMenu.textShadow }}>
                {sideMenu.name}
              </span>
            </div>
            {sideMenu.description && (
              <span className="font-kelly text-white/60 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] mt-1 text-center">
                {sideMenu.description}
              </span>
            )}
            <button
              onClick={() => openSideMenuItemModal(parentMenu, sideMenu)}
              className="mt-2 flex items-center gap-1 text-xs text-[#c5a059] hover:text-[#e6b450] transition-colors font-oswald uppercase"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Item
            </button>
          </div>

          <div className="hidden sm:block h-30 mt-8 w-px bg-white/30 self-stretch" />

          <div className="flex-1 flex flex-col justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6">
            {sideMenu.items.map((item) => (
              <div key={item.id} className="cursor-pointer hover:bg-white/5 transition-colors rounded p-1">
                <p className="font-oswald text-white text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] uppercase tracking-[0.5px] font-normal break-words">
                  {item.name}{item.price ? `...............................${item.price}` : ''}
                </p>
                {item.desc && (
                  <p className="font-kelly text-white/60 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] mt-0 leading-snug whitespace-pre-line">
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
            {sideMenu.items.length === 0 && (
              <p className="font-kelly text-white/40 text-center py-4">No items yet. Click "Add Item" to add items.</p>
            )}
          </div>

          {sideMenu.image && (
            <div className="order-first sm:order-last flex justify-center items-center pr-13 w-full sm:w-[220px] md:w-[260px] lg:w-[300px] sm:shrink-0 pb-3 sm:pb-0">
              <img src={sideMenu.image} alt={sideMenu.name}
                className="mx-auto w-[150px] sm:w-[180px] md:w-[220px] lg:w-[260px] object-cover" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMenuContent = (menu: Menu) => {
    return (
      <div key={menu.id} className="relative border border-[#c5a059] rounded-sm">
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => openItemModal(menu)}
            className="flex items-center gap-2 bg-[#c5a059] border-[#c5a059] h-10 text-white px-6 rounded hover:bg-[#b58a3f] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </button>
          <button
            onClick={() => openSideMenuModal(menu)}
            className="flex items-center gap-2 bg-[#c5a059]/70 border-[#c5a059] h-10 text-white px-6 rounded hover:bg-[#c5a059] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Side Menu
          </button>
        </div>

        <div className="flex flex-col md:flex-row min-h-auto md:min-h-[380px]">
          <div className="flex flex-row md:flex-col items-center justify-between md:justify-center w-full md:w-[250px] lg:w-[280px] md:shrink-0 border-b md:border-b-0 md:border-r py-3 md:py-0 px-4 md:px-0">
            <img src={imgAppetizer} alt="Appetizer" className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:hidden object-cover rounded shadow-xl z-20" />
            <h2 className="font-oswald text-white font-bold text-[24px] sm:text-[28px] md:text-[38px] lg:text-[44px] uppercase tracking-[1.5px] text-shadow-red text-center mt-0 md:ml-30 md:mt-30 md:mb-60 px-2 md:px-4">
              {menu.name}
            </h2>
            <img src={imgCuttingBoard} alt="Cutting board" className="w-[80px] h-[60px] sm:w-[100px] sm:h-[70px] md:hidden object-cover rounded shadow-xl z-20 rotate-6" />
            <img src={imgAppetizer} alt="Appetizer" className="absolute -left-8 -top-6 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] object-cover rounded shadow-xl z-20 hidden md:block" />
            <img src={imgCuttingBoard} alt="Cutting board" className="absolute -right-6 -top-5 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[247px] rotate-12 h-[100px] sm:h-[130px] md:h-[150px] lg:h-[165px] object-cover rounded shadow-xl z-20 hidden md:block" />
          </div>

          <div className="hidden md:block md:ml-30 bg-gray-500 w-0.5 md:mt-30 h-auto my-8"></div>

          <div className="flex-1 md:ml-30 md:mt-10 flex flex-col justify-center gap-2 sm:gap-5 md:gap-6 px-4 sm:px-6 md:px-8 lg:px-10 py-2 md:py-8 lg:py-10">
            {menu.items.map((item) => (
              <div key={item.id} className="mb-0 sm:mb-1">
                <p className="appetizer-name font-oswald text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] uppercase tracking-[0.5px] sm:tracking-[0.6px] font-normal leading-tight break-words">
                  {item.name}{item.price ? `...............................${item.price}` : ''}
                </p>
                {item.desc && (
                  <p className="font-kelly text-white/60 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] mt-0 leading-snug whitespace-pre-line">
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
            {menu.items.length === 0 && (
              <p className="font-kelly text-white/40 text-center py-4">No items yet. Click "Add Item" to add items.</p>
            )}
          </div>
        </div>

        {menu.sideMenus.map(sideMenu => renderSideMenu(sideMenu, menu))}
        {renderDecoration(menu)}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
        <div className="text-white font-oswald text-xl">Loading menu...</div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full bg-[#0e0e0e] overflow-x-hidden"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Kelly+Slab&display=swap');
        .font-kelly { font-family: 'Kelly Slab', serif; }
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .text-shadow-red { text-shadow: 4px 3px 0px #800020; }
        .border-gold { border-color: #c5a059; }

        .mobile-menu {
          transition: max-height 0.3s ease, opacity 0.3s ease;
          overflow: hidden;
        }
        .mobile-menu.open { max-height: 300px; opacity: 1; }
        .mobile-menu.closed { max-height: 0; opacity: 0; }

        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #c5a059;
          margin: 5px 0;
          transition: 0.3s;
        }
        
        @font-face {
          font-family: "Quentin";
          src: url("/fonts/Quentin.woff2") format("woff2");
          font-weight: 400;
          font-style: normal;
        }

        @media (max-width: 640px) {
          .appetizer-name { word-break: break-word; white-space: normal !important; }
          .menu-title { font-size: 28px !important; }
          .hours-text { font-size: 12px !important; }
        }
        @media (max-width: 768px) { .salad-title { font-size: 24px !important; } }
        @media (min-width: 1024px) { .appetizer-name { white-space: nowrap; } }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }
        
        .modal-content {
          background: linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 100%);
          border: 2px solid #c5a059;
          border-radius: 20px;
          padding: 30px;
          max-width: 500px;
          width: 90%;
          animation: slideUp 0.3s ease;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        
        .modal-content input,
        .modal-content textarea,
        .modal-content select {
          background: #2a2a2a;
          border: 1px solid #c5a059;
          border-radius: 8px;
          padding: 10px 12px;
          color: white;
          font-family: 'Oswald', sans-serif;
          width: 100%;
          outline: none;
          transition: all 0.2s ease;
        }
        
        .modal-content input:focus,
        .modal-content textarea:focus,
        .modal-content select:focus {
          border-color: #e6b450;
          box-shadow: 0 0 0 2px rgba(197, 160, 89, 0.2);
        }
        
        .modal-content input::placeholder,
        .modal-content textarea::placeholder {
          color: #666;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c5a059]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-oswald text-white text-2xl uppercase tracking-wider mb-4">
                Add New {modalType === "menu" ? "Menu" : modalType === "sidemenu" ? "Side Menu" : "Item"}
              </h3>

              {modalType === "menu" && (
                <>
                  <div className="mb-4 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Menu Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter menu name"
                      className="w-full"
                      autoFocus
                    />
                  </div>
                  <div className="mb-4 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Description (Optional)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter description"
                      rows={3}
                      className="w-full resize-none"
                    />
                  </div>
                </>
              )}

              {modalType === "sidemenu" && (
                <>
                  <div className="mb-4 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Side Menu Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter side menu name"
                      className="w-full"
                      autoFocus
                    />
                  </div>
                  <div className="mb-4 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter description"
                      rows={2}
                      className="w-full resize-none"
                    />
                  </div>
                  <div className="mb-4 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Side Menu Image
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[
                        { name: "Salad Plate", value: imgSaladPlate },
                        { name: "Shrimp", value: iconShrimp },
                        { name: "Champagne", value: iconChampagne },
                        { name: "Barbecue", value: iconBarbecue },
                        { name: "Beer", value: iconBeer },
                        { name: "Pizza", value: iconPizza },
                        { name: "Fast Food", value: iconFastFood },
                        { name: "Champagne L", value: iconChampagneL },
                        { name: "Barbecue L", value: iconBarbecueL },
                        { name: "Spatula", value: iconSpatula },
                        { name: "Fish", value: iconFish },
                        { name: "Salad Bottom", value: imgSaladBottom },
                        { name: "Appetizer", value: imgAppetizer },
                        { name: "Cutting Board", value: imgCuttingBoard }
                      ].map((option) => (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, sideMenuImage: option.value })}
                          className={`px-3 py-1.5 rounded-md text-xs font-oswald uppercase transition-all ${formData.sideMenuImage === option.value
                              ? "bg-[#c5a059] text-white"
                              : "bg-[#2a2a2a] text-white/70 hover:bg-[#c5a059]/30 border border-[#c5a059]/50"
                            }`}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={formData.sideMenuImage}
                      onChange={(e) => setFormData({ ...formData, sideMenuImage: e.target.value })}
                      placeholder="Or enter custom image URL"
                      className="w-full bg-[#2a2a2a] border border-[#c5a059] rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#e6b450]"
                    />
                  </div>
                  <div className="mb-4 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Badge Color
                    </label>
                    <select
                      value={formData.badgeColor}
                      onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                      className="w-full"
                    >
                      <option value="bg-[#d25858]">Red (#d25858)</option>
                      <option value="bg-[#2a6e9e]">Blue (#2a6e9e)</option>
                      <option value="bg-[#7a5230]">Brown (#7a5230)</option>
                      <option value="bg-[#c5a059]">Gold (#c5a059)</option>
                    </select>
                  </div>
                  <div className="mb-6 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Text Shadow
                    </label>
                    <select
                      value={formData.textShadow}
                      onChange={(e) => setFormData({ ...formData, textShadow: e.target.value })}
                      className="w-full"
                    >
                      <option value="text-shadow-red">Red Shadow</option>
                      <option value="4px 3px 0px #0a3a5e">Blue Shadow</option>
                      <option value="4px 3px 0px #3d2810">Brown Shadow</option>
                      <option value="4px 3px 0px #8b5a2e">Gold Shadow</option>
                    </select>
                  </div>
                </>
              )}

              {modalType === "item" && (
                <>
                  <div className="mb-4 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={formData.itemName}
                      onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                      placeholder="Enter item name"
                      className="w-full"
                      autoFocus
                    />
                  </div>
                  <div className="mb-4 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Price
                    </label>
                    <input
                      type="text"
                      value={formData.itemPrice}
                      onChange={(e) => setFormData({ ...formData, itemPrice: e.target.value })}
                      placeholder="e.g., $12.99"
                      className="w-full"
                    />
                  </div>
                  <div className="mb-6 text-left">
                    <label className="font-oswald text-white/80 text-sm uppercase tracking-wider mb-2 block">
                      Description
                    </label>
                    <textarea
                      value={formData.itemDesc}
                      onChange={(e) => setFormData({ ...formData, itemDesc: e.target.value })}
                      placeholder="Enter item description"
                      rows={3}
                      className="w-full resize-none"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-transparent border border-[#c5a059] text-[#c5a059] py-2 rounded-lg hover:bg-[#c5a059]/10 transition-colors font-oswald uppercase text-sm tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#c5a059] text-white py-2 rounded-lg hover:bg-[#b58a3f] transition-colors font-oswald uppercase text-sm tracking-wider"
                >
                  Add {modalType === "menu" ? "Menu" : modalType === "sidemenu" ? "Side Menu" : "Item"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav className="relative z-30 bg-[#121618]">
        <div className="relative flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 h-[70px] sm:h-[85px] md:h-[98px]">
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <span className="font-oswald text-[16px] sm:text-[20px] md:text-[22px] tracking-widest">
              <span className="text-[#c5a059]">DEEP</span>
              <span className="text-white">NET</span>
              <span className="text-[#857878]">SOFT</span>
            </span>
          </div>

          <img
            src={imgLogo}
            alt="Logo"
            className="absolute left-1/2 -translate-x-1/2 top-[35px] sm:top-[45px] md:top-[50px]
              w-[70px] h-[70px] sm:w-[110px] sm:h-[110px] md:w-[95px] md:h-[95px] lg:w-[110px] lg:h-[110px]
              object-contain z-40"
          />

          <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] lg:text-[15px] tracking-[0.5px] ml-auto">
            {["HOME", "MENU", "MAKE A RESERVATION", "CONTACT US"].map((item) => (
              <li
                key={item}
                className={`cursor-pointer transition-colors duration-200 ${item === "MENU" ? "text-[#c5a059]" : "text-[#f5f5f5] hover:text-[#c5a059]"}`}
              >
                {item}
              </li>
            ))}
          </ul>

          <button
            className="hamburger md:hidden ml-auto flex flex-col justify-center p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
            <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>

        <div className={`mobile-menu md:hidden bg-[#121618] border-t border-white/10 ${mobileMenuOpen ? 'open' : 'closed'}`}>
          <ul className="flex flex-col px-4 sm:px-5 py-3 gap-3 text-[13px] sm:text-[14px] tracking-[0.5px]">
            {["HOME", "MENU", "MAKE A RESERVATION", "CONTACT US"].map((item) => (
              <li
                key={item}
                className={`cursor-pointer py-2 transition-colors duration-200 ${item === "MENU" ? "text-[#c5a059]" : "text-[#f5f5f5] hover:text-[#c5a059]"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative w-full min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[380px] overflow-hidden">
        <img src={imgBg} alt="Hero background" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/55" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <h1 className="font-oswald text-white text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-semibold uppercase tracking-[2px] sm:tracking-[3px] leading-tight">
            MENU
          </h1>
          <p className="font-kelly text-[#bbb] text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] max-w-[90%] sm:max-w-[90%] md:max-w-[600px] lg:max-w-[650px] mt-3 leading-relaxed">
            Please take a look at our menu featuring food, drinks, and brunch.
            If you'd like to place an order, use the "Order Online" button located below the menu.
          </p>
        </div>
      </div>

      {/* ── MENU CONTENT ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "900px" }}>
        {/* Backgrounds */}
        <img src={imgMenuBg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover object-center opacity-30" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${menuBG})` }}></div>
        <div className="absolute inset-0 bg-black/80" />

        {/* Decorative icons */}
        <div className="absolute right-0 top-0 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[130px] h-full opacity-30 md:opacity-40 pointer-events-none overflow-hidden hidden sm:block">
          {[
            { src: iconShrimp, top: 5, width: 80 },
            { src: iconChampagne, top: 120, width: 90 },
            { src: iconBarbecue, top: 260, width: 100 },
            { src: iconBeer, top: 420, width: 90 },
            { src: iconPizza, top: 600, width: 100 },
            { src: iconFastFood, top: 780, width: 90 },
          ].map(({ src, top, width }, i) => (
            <img key={i} src={src} alt="" className="absolute right-1 sm:right-2 object-contain"
              style={{ top: `${top}px`, width: `${width}px`, height: `${width}px` }} />
          ))}
        </div>

        <div className="absolute left-0 top-0 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[130px] h-full opacity-30 md:opacity-40 pointer-events-none overflow-hidden hidden sm:block">
          {[
            { src: iconChampagneL, top: 0, width: 80 },
            { src: iconBarbecueL, top: 150, width: 90 },
            { src: iconSpatula, top: 320, width: 85 },
            { src: iconFish, top: 500, width: 90 },
            { src: iconBarbecue, top: 680, width: 85 },
          ].map(({ src, top, width }, i) => (
            <img key={i} src={src} alt="" className="absolute left-1 sm:left-2 object-contain"
              style={{ top: `${top}px`, width: `${width}px`, height: `${width}px` }} />
          ))}
        </div>
        
        <div className="relative mb-8 sm:mb-10 md:mb-12 -mx-3 sm:-mx-4 md:-mx-5 lg:-mx-6">
          {/* Background Image - with repeat pattern */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: `url(${gapImg})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/90"></div>
          </div>

          {/* TAB SECTION - Menu tabs with Add Menu button outside */}
          <div className="relative flex flex-wrap items-center justify-center gap-3 py-4 sm:py-5 md:py-6 px-4 max-w-[1300px] mx-auto">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {menus.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => setActiveTab(menu.id)}
                  className={`font-oswald uppercase text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px]
                    tracking-[0.5px] sm:tracking-[1px] px-3 sm:px-5 md:px-7 lg:px-10 py-2 sm:py-2.5 md:py-3 border
                    transition-colors duration-200 ${activeTab === menu.id
                      ? "bg-[#c5a059] border-[#c5a059] text-white"
                      : "bg-transparent border-[#c5a059] text-white hover:bg-[#c5a059]/20"
                    }`}
                >
                  {menu.name}
                </button>
              ))}
            </div>
            <button
              onClick={openMenuModal}
              className="font-oswald uppercase text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px]
                tracking-[0.5px] sm:tracking-[1px] px-3 sm:px-5 md:px-7 lg:px-10 py-2 sm:py-2.5 md:py-3 border
                bg-transparent border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/20 transition-colors whitespace-nowrap"
            >
              + Add Menu
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="relative z-10 max-w-[1300px] mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-6 sm:py-8 md:py-10 lg:py-12">
          {/* Menu Content */}
          {menus.filter(menu => menu.id === activeTab).map(menu => renderMenuContent(menu))}

          {/* Opening Hours */}
          <div className="mt-8 sm:mt-10 border border-[#808080] rounded-[18px] bg-black/60 px-3 sm:px-5 md:px-8 lg:px-10 py-5 sm:py-6 md:py-7 lg:py-8 flex flex-col lg:flex-row items-center gap-5 sm:gap-6 md:gap-7 lg:gap-8">
            <div className="shrink-0 text-center lg:text-left">
              <p className="text-[#9b7e46] text-[20px] sm:text-[22px] md:text-[24px] lg:text-[25px] leading-[45px] tracking-[0%] font-normal italic mb-1 sm:mb-2" style={{ fontFamily: "Quentin, serif" }}>
                Be there on time
              </p>
              <h3 className="font-oswald text-white font-semibold text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] uppercase tracking-[1px] sm:tracking-[1.2px] text-shadow-red leading-tight">
                OPENING HOURS
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row flex-1 items-stretch divide-y sm:divide-y-0 sm:divide-x divide-white/20">
              {openingHours.map((row, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3">
                  <p className="font-oswald text-white font-bold text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] uppercase tracking-[0.5px] text-center">
                    {row.days}
                  </p>
                  <p className="font-oswald text-[#0796ef] font-bold text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] uppercase tracking-[0.5px] mt-1">
                    {row.hours}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0a0a0a] pt-6 sm:pt-8 md:pt-10 pb-0">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-5 lg:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pb-6 sm:pb-8 md:pb-10">
          {/* Connect */}
          <div className="border border-[#c5a059] rounded-[15px] py-4 px-4 sm:py-5 sm:px-5 md:py-5 md:px-6 flex flex-col items-center gap-2">
            <p className="font-oswald text-[#c5a059] uppercase text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] tracking-widest mb-1">
              Connect with Us
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={iconPhone} alt="Phone" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
              <span className="font-oswald text-[#857878] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] tracking-wide">
                +91 940 061 3433
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={iconEmail} alt="Email" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
              <span className="font-oswald text-[#857878] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px] tracking-wide text-center">
                info@deepnetsoft.com
              </span>
            </div>
          </div>

          {/* Logo */}
          <div className="relative border border-[#c5a059] rounded-[15px] pt-14 sm:pt-16 pb-5 sm:pb-6 px-4 sm:px-5 md:px-6 flex flex-col items-center justify-center gap-2 order-first lg:order-none">
            <img src={imgLogo} alt="Logo" className="absolute -top-8 sm:-top-10 md:-top-12 w-[65px] h-[65px] sm:w-[85px] sm:h-[85px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px] object-contain z-20" />
            <p className="font-oswald text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] tracking-widest text-center">
              <span className="text-[#c5a059]">DEEP</span>
              <span className="text-white"> NET </span>
              <span className="text-[#857878]">SOFT</span>
            </p>
            <div className="flex items-center gap-3 sm:gap-4 mt-1">
              <img src={iconFacebook} alt="Facebook" className="w-4 h-4 sm:w-5 sm:h-5 object-contain cursor-pointer hover:opacity-80" />
              <img src={iconTwitter} alt="Twitter" className="w-4 h-4 sm:w-5 sm:h-5 object-contain cursor-pointer hover:opacity-80" />
              <img src={iconInstagram} alt="Instagram" className="w-4 h-4 sm:w-5 sm:h-5 object-contain cursor-pointer hover:opacity-80" />
            </div>
          </div>

          {/* Find us */}
          <div className="border border-[#c5a059] rounded-[15px] py-4 px-4 sm:py-5 sm:px-5 md:py-5 md:px-6 flex flex-col items-center gap-2 sm:col-span-2 lg:col-span-1">
            <p className="font-oswald text-[#c5a059] uppercase text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] tracking-widest mb-1">
              Find us
            </p>
            <div className="flex items-start gap-2 sm:gap-3">
              <img src={iconPin} alt="Location" className="w-4 h-4 sm:w-5 sm:h-5 object-contain mt-0.5 shrink-0" />
              <span className="font-oswald text-[#857878] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] tracking-wide text-center">
                First floor, Geo infopark,<br />
                Infopark EXPY, Kakkanad
              </span>
            </div>
          </div>
        </div>
        <div className="bg-[#111] border-t border-white/10 px-3 sm:px-5 md:px-8 lg:px-10 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-oswald text-[#857878] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] tracking-wide text-center sm:text-left">
            © 2026 Deepnetsoft Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <span className="font-oswald text-[#857878] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] tracking-wide cursor-pointer hover:text-[#c5a059] transition-colors">Terms &amp; Conditions</span>
            <span className="font-oswald text-[#857878] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] tracking-wide cursor-pointer hover:text-[#c5a059] transition-colors">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}