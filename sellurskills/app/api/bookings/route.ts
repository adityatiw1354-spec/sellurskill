import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
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

  const { error } = await supabase.from("bookings").insert({
    customer_id: user.id,
    provider_id: body.provider_id,
    service_id: body.service_id,
    amount: body.amount,
    status: "pending",
  });

  if (error) {
    console.log(error);

    return NextResponse.json(error, {
      status: 500,
    });
  }

  return NextResponse.json({
    success: true,
  });
}