import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

const { data, error } = await supabase
  .from("services")
  .update({
    title: body.title,
    description: body.description,
    price: body.price,
    duration: body.duration,
  })
  .eq("id", id)
  .eq("provider_id", user.id)
  .select();

console.log("===== UPDATE API =====");
console.log("Route ID:", id);
console.log("Logged User:", user.id);
console.log("Request Body:", body);
console.log("Updated Data:", data);
console.log("Update Error:", error);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({
  success: true,
  data,
  error,
});
}