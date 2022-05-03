
export async function postFormData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Server Not Responding');
  }

  return null;
}
