

// Fetch individual container from API based on ID and return it
export const fetchContainer = async (id) => {
    let res = await fetch(`../api/getContainer/${id}`);
    let data = await res.json();
    console.log(data);
    return data;
}

// Fetch list of containers from API and return it
export const fetchContainers = async () => {
    let res = await fetch('../api/getContainers');
    let data = await res.json();
    console.log(data);
    return data;
}