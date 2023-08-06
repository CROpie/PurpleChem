import { j as json } from "../../../chunks/index.js";
const POST = async ({ request, locals }) => {
  const form = {
    success: false,
    error: null
  };
  const { newLocation } = await request.json();
  const session = await locals.getSession();
  const userID = session?.user.id;
  if (!newLocation || !userID) {
    form.error = "Somehow invalid data made it to the server";
    return json(form);
  }
  const { data, error } = await locals.supabase.from("locations").insert({
    userID,
    locationName: newLocation
  }).select().maybeSingle();
  if (error) {
    form.error = "Error connecting to database...";
    return json(form);
  }
  if (!data) {
    form.error = "Error connecting to database...";
    return json(form);
  }
  const newLocationData = {
    id: data.id,
    locationName: data.locationName
  };
  form.success = true;
  return json({ newLocationData, form });
};
const PUT = async ({ request, locals }) => {
  const form = {
    success: false,
    error: null
  };
  const { orderID, locationID, amount } = await request.json();
  if (!orderID || !amount) {
    form.error = "Somehow invalid data made it to the server";
    return json(form);
  }
  let isConsumed = false;
  if (amount == 0) {
    console.log("empty!");
    isConsumed = true;
  }
  const { error: errorAmount } = await locals.supabase.from("orders").update({ amount, isConsumed }).eq("id", orderID);
  if (errorAmount) {
    console.log(errorAmount);
    form.error = "Error connecting to database...";
    return json(form);
  }
  const { error: errorLocation } = await locals.supabase.from("orders").update({ locationID }).eq("id", orderID);
  if (errorLocation) {
    console.log(errorLocation);
    form.error = "Error connecting to database...";
    return json(form);
  }
  const { data, error: getLocationName } = await locals.supabase.from("locations").select().eq("id", locationID).maybeSingle();
  if (getLocationName) {
    console.log(errorLocation);
    form.error = "Error connecting to database...";
    return json(form);
  }
  if (!data) {
    form.error = "Error connecting to database...";
    return json(form);
  }
  const locationObject = {
    id: data.id,
    locationName: data.locationName
  };
  form.success = true;
  console.log("success");
  return json({ locationObject, form });
};
export {
  POST,
  PUT
};
