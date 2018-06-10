const linkThingDB = async () => {
  let db = null;

  return new Promise((resolve, reject) => {
    if (db) resolve(db)

    const request = indexedDB.open('things', 1)
    request.onupgradeneeded = e => {
      e.target.result.createObjectStore('things', { keyPath: 'id' })
    }

    request.onsuccess = e => {
      db = e.target.result
      resolve(db)
    }
    request.onerror = e => reject(e)
  })
}

const linkTable = (tran, name) => {
  const store = tran.objectStore(name)

  return {
    add: (...arg) => new Promise((resolve, reject) => {
      const req = store.add(...arg)
      req.onsuccess = e => resolve()
      req.onerror = e => reject(e)
    }),
    getAll: (...arg) => new Promise((resolve, reject) => {
      const req = store.getAll(...arg)
      req.onsuccess = e => resolve(e.target.result)
      req.onerror = e => reject(e)
    }),
    get: (...arg) => new Promise((resolve, reject) => {
      const req = store.get(...arg)
      req.onsuccess = e => resolve(e.target.result)
      req.onerror = e => reject(e)
    }),
    put: (...arg) => new Promise((resolve, reject) => {
      const req = store.put(...arg)
      req.onsuccess = e => resolve(e.target.result)
      req.onerror = e => reject(e)
    }),
    openCursor: (...arg) => new Promise((resolve, reject) => {
      const req = store.openCursor()
      req.onsuccess = e => resolve(e.target.result)
      req.onerror = e => reject(e)
    }),
  }
}

export const saveThings = async (things) => {
  const db = await linkThingDB()
  const tran = db.transaction(['things'], 'readwrite')
  const store = linkTable(tran, 'things')

  await Promise.all(things.map(thing => store.put(thing)));
}

export const getThings = async things => {
  const db = await linkThingDB()

  const tran = db.transaction(['things'], 'readwrite')
  const store = linkTable(tran, 'things')

  return await store.getAll()
}
