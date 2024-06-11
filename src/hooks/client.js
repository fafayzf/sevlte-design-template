/** @type {import('@sveltejs/kit').HandleClientError} */
export async function handleError({ error, event }) {
  console.log(error, event);
  return {
    message: 'Error Page',
    errorId: '500'
  }
}
