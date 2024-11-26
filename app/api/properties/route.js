export const GET = async (req) => {
  try {
    return new Response("Hello world,", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!.", { status: 500 });
  }
};
