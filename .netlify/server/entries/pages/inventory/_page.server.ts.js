import { f as fail } from "../../../chunks/index.js";
const load = async ({ locals: { supabase, getSession } }) => {
  console.log("running load function");
  const session = await getSession();
  const userID = session?.user.id;
  const getLocationList = async () => {
    const { data: locationsList, error: locationError } = await supabase.from("locations").select("id, locationName").eq("userID", userID);
    if (locationError) {
      console.log("There was a problem while querying the database (locations).", locationError);
    }
    return locationsList;
  };
  const getOrdersList = async () => {
    let { data: ordersList, error: orderError } = await supabase.from("orders").select(
      "id, chemicalID( id, chemicalName, CAS, MW, MP, BP, density, inchi, smile ), amount, amountUnit, isConsumed, locationID( id, locationName ), statusID (id, statusValue)"
    ).eq("userID", userID);
    if (orderError) {
      console.log("There was a problem while querying the database (orders).", orderError);
    }
    if (ordersList) {
      ordersList = ordersList?.filter((order) => order.isConsumed == false);
    }
    return ordersList;
  };
  return { locationsList: getLocationList(), ordersList: getOrdersList() };
};
const actions = {
  /*
  	updateData: async (event) => {
  		const form: FormResult = {
  			success: false,
  			error: null
  		};
  
  		const formData = await event.request.formData();
  		if (!formData) {
  			form.error = 'Request failed...';
  			return fail(400, form);
  		}
  
  		// const session = await event.locals.getSession();
  		// const userID = session?.user.id;
  
  		const amount = Number(formData.get('amount'));
  		const locationID = Number(formData.get('locationID'));
  		const orderID = Number(formData.get('orderID'));
  
  		let isConsumed = false;
  
  		if (amount == 0) {
  			console.log('empty!');
  			isConsumed = true;
  		}
  		const { error: errorAmount } = await event.locals.supabase
  			.from('orders')
  			.update({ amount, isConsumed })
  			.eq('id', orderID);
  
  		if (errorAmount) {
  			console.log(errorAmount);
  			form.error = 'Error connecting to database...';
  			return fail(400, form);
  		}
  
  		if (!locationID) {
  			form.error = 'Required input not present.';
  			return fail(400, form);
  		}
  
  		const { error: errorLocation } = await event.locals.supabase
  			.from('orders')
  			.update({ locationID: locationID })
  			.eq('id', orderID);
  
  		if (errorLocation) {
  			console.log(errorLocation);
  			form.error = 'Error connecting to database...';
  			return fail(400, form);
  		}
  		form.success = true;
  		return form;
  	},
  	*/
  forceStatus: async (event) => {
    const form = {
      success: false,
      error: null
    };
    const formData = await event.request.formData();
    if (!formData) {
      form.error = "Request failed...";
      return fail(400, form);
    }
    const id = Number(formData.get("orderID"));
    const { error } = await event.locals.supabase.from("orders").update({
      statusID: 3
    }).eq("id", id);
    if (error) {
      console.log(error);
      form.error = "Error connecting to database...";
      return fail(400, form);
    }
    form.success = true;
    return form;
  }
};
export {
  actions,
  load
};
