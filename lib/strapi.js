export async function getAllNotes() {
  const response = await fetch(`http://localhost:1337/api/notes`);
  const data = await response.json();

  const res = {};
  data.data.forEach(({ id, title, content, slug, updatedAt }) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt,
    });
  });

  return res;
}

export async function addNote(data) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: "POST",
    headers: {
      Authorization:
        "bearer 80985bb38cf749e5568e51c637d796c69c7a6b1e820152a1d144369d9b1568b26eae1070a42f06f691febb07a5134b0a5a00e24e69c298b50414f28c3299ead4b05b9f876883020868c5769a726ae5ca02ef31b2a5786efbccfe041b7131e609eb56680a60e38a973dae25d26d1e4ac56e7651d4d1c6a4e1fe7f68999dbb4eed",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.slug;
}

export async function updateNote(uuid, data) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization:
        "bearer 08b99f0885bd0b45b710f16a96f76144fd0c89f5853165f5c1095f7400f2c59501db2d3fddf17e9f5a01ccebf0a3badba422e9303e62bc4101160c1fdd68db80466518d1dc6ebc0f77699acffad6109e264a2a668fc7a158c76e9931d6186a347258b63919ff23bc0b79899f40d7cc73d39d7f6213bc4504bda684e45635bb12",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
}

export async function getNote(uuid) {
  const response = await fetch(
    `http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data = await response.json();
  return {
    title: data.data[0] && data.data[0].title,
    content: data.data[0] && data.data[0].content,
    updateTime: data.data[0] && data.data[0].updatedAt,
    id: data.data[0] && data.data[0].id,
  };
}

export async function delNote(uuid) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "bearer 08b99f0885bd0b45b710f16a96f76144fd0c89f5853165f5c1095f7400f2c59501db2d3fddf17e9f5a01ccebf0a3badba422e9303e62bc4101160c1fdd68db80466518d1dc6ebc0f77699acffad6109e264a2a668fc7a158c76e9931d6186a347258b63919ff23bc0b79899f40d7cc73d39d7f6213bc4504bda684e45635bb12",
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
}
