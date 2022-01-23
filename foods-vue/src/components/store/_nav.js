export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavItem",
        name: "Dashboard",
        to: "/store/dashboard",
        icon: "cil-user",
      },
      {
        _name: "CSidebarNavItem",
        name: "Category",
        to: "/store/category",
        icon: "cil-library-add",
      },
      {
        _name: "CSidebarNavItem",
        name: "SubCategory",
        to: "/store/category/sub",
        icon: "cil-transfer",
      },
      {
        _name: "CSidebarNavItem",
        name: "Product",
        to: "/store/product",
        icon: "cil-gift",
      },
      {
        _name: "CSidebarNavItem",
        name: "Thông báo",
        to: "/admin/notification",
        icon: "cil-bell",
      },
      {
        _name: "CSidebarNavItem",
        name: "Tin tức",
        to: "/admin/news",
        icon: "cil-newspaper",
      },
    ],
  },
];
