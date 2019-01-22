import update from "immutability-helper";

/**
 * name: Find index
 *
 */
update.extend("$findIndex", (val, obj) => {
  const index = obj.findIndex(e => e[val[2] || "_id"] === val[0]);

  if (index === -1) {
    return obj;
  }
  if (val[1]) {
    return update(obj, {
      [index]: { $merge: val[1] }
    }); 
  }
  return update(obj, {
    $splice: [[index, 1]]
  });
});


/**
 * name: indexOf
 */
update.extend("$indexOf", (val, obj) => {
  const index = obj.indexOf(val[0]);
  if (index === -1) {
    return obj;
  }

  return update(obj, {
    $splice: val[1] ? [[index, 1]] : [[index, 1, val[1]]]
  });
});

export default update;
