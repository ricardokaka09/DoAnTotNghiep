export default [
    {
        _name: "CSidebarNav",
        _children: [
            {
                _name: "CSidebarNavItem",
                name: "Người dùng",
                to: "/admin/user",
                icon: "cil-user",
            },
            {
                _name: "CSidebarNavItem",
                name: "Nạp tiền",
                to: "/admin/topup",
                icon: "cil-library-add",
            },
            {
                _name: "CSidebarNavItem",
                name: "Chuyển tiền",
                to: "/admin/transfer",
                icon: "cil-transfer",
            },
            {
                _name: "CSidebarNavItem",
                name: "Thưởng",
                to: "/admin/reward",
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
