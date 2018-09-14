let data = [
    {
        id: 1,
        children: [
            {
                id: 11,
                children: [
                    {
                        id: 111,
                        children: [
                            {
                                id: 114
                            },
                            {
                                id: 115
                            }
                        ]
                    },
                    {
                        id: 222,
                        children: [
                            {
                                id: 224
                            },
                            {
                                id: 225
                            }
                        ]
                    }
                ]
            },
            {
                id: 22
            }
        ]
    },
    {
        id: -1
    }
];
let arr = [];
let temp = [];
function traverse(node) {
    arr.push(node.id);

    if (node && Array.isArray(node.children)) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            traverse(node.children[i]);
        }
    }

    if (node.id !== 224) {
        arr.pop();
    } else {
        temp = arr.slice(0);
        throw new Error();
    }
}
try {
    traverse({ id: 0, children: data });
} catch (e) {
    console.log(temp);
}

// function getChildren(node, pid) {
//     return node.reduce((prev, cur) => {
//         return (prev[cur.id] = { pid, id: cur.id });
//     }, {});
// }

// function a(node) {
//     let pid = node.id;
//     if (node && Array.isArray(node.children)) {
//         node.children.reduce((prev, cur) => {
//             return (prev[cur.id] = { pid, id: cur.id });
//         }, {});
//     }
// }
