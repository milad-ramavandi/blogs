const api = async (url: string, option?: RequestInit) => {
  try {
    const res = await fetch(`${url}`, option);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res;
  } catch (error) {
    console.log("Final fetch error:", error);
  }
};

export default api;
