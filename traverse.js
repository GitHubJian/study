// 遍历 tree 查找所有父级

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
]

let arr = []
let temp = []
function traverse(node) {
  arr.push(node.id)

  if (node && Array.isArray(node.children)) {
    for (let i = 0, len = node.children.length; i < len; i++) {
      traverse(node.children[i])
    }
  }

  if (node.id !== 224) {
    arr.pop()
  } else {
    temp = arr.slice(0)
    throw new Error()
  }
}

try {
  traverse({ id: 0, children: data })
} catch (e) {
  console.log(temp)
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

// 2.0
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
]

function findPath(node, id, path) {
  if (!path) {
    path = []
  }

  path.push(node)
  if (node.id === id) {
    return true
  } else {
  }
  if (Array.isArray(node.item) && node.item.length > 0) {
    for (let i = 0, len = node.item.length; i < len; i++) {
      let a = findPath(node.item[i], id, path)
      if (a === false) {
        path.pop()
      }

      if (a === true) {
      }
    }
  }

  // if (node.item.some(child => findPath(child, id, path))) {
  //     return path;
  // }
  path.pop()
  return false
}

console.log(findPath({ item: arr }, 7).map(x => x.id))
