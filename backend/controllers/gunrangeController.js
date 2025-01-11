const dataWebsite = "http://localhost:3000/gunrange";

async function getGuns() {
  let result = await fetch(dataWebsite);
  return result.json();
}

async function getGun(id) {
  return await fetch(dataWebsite + `/${id}`)
    .then(result => {
      if (result.length === 0) {
        return null;
      } else
        return result.json();
    });
}

async function addGun(manufacturer, model, country) {
  const lastId = await getGuns()
    .then(data => {
      return data.sort((a, b) => b.id - a.id)[0].id;
    });
  return await
    fetch(dataWebsite, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        manufacturer,
        model,
        country
      }),
    }).then(result => {
        if (result.length === 0) {
          return null;
        } else {
          return lastId + 1;
        }
      }
    );
}

module.exports = { getGuns, addGun, getGun };
