let arr = [
    {
        id: 1,
        item: [
            {
                id: 3,
                item: []
            },
            {
                id: 4,
                item: []
            }
        ]
    },
    {
        id: 2,
        item: [
            {
                id: 5,
                item: []
            },
            {
                id: 6,
                item: [
                    {
                        id: 7,
                        item: []
                    }
                ]
            }
        ]
    }
];

function findPath(node, id, path) {
    if (!path) {
        path = [];
    }

    path.push(node);
    if (node.id === id) {
        return true;
    }else{
        
    }
    if (Array.isArray(node.item) && node.item.length > 0) {
        for (let i = 0, len = node.item.length; i < len; i++) {
            let a = findPath(node.item[i], id, path);
            if (a === false) {
                path.pop();
            }

            if (a === true) {
            }
        }
    }

    // if (node.item.some(child => findPath(child, id, path))) {
    //     return path;
    // }
    path.pop();
    return false;
}

console.log(findPath({ item: arr }, 7).map(x => x.id));
