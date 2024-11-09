export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  const user = await prisma.User.findFirst({
    where: {
      username,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // If user is found, return the user data
  return NextResponse.json(user, { status: 200 });
}
