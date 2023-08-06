import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_ANON_KEY } from "./public.js";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
function sequence(...handlers) {
  const length = handlers.length;
  if (!length)
    return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
const first = async ({ event, resolve }) => {
  let theme = null;
  let newTheme = null;
  const themeld = event.url.searchParams.get("themeld");
  const themeco = event.url.searchParams.get("themeco");
  if (themeld && themeco) {
    newTheme = `${themeld} ${themeco}`;
  }
  const cookieTheme = event.cookies.get("colortheme");
  if (newTheme) {
    theme = newTheme;
  } else if (cookieTheme) {
    theme = cookieTheme;
  }
  if (theme) {
    return await resolve(event, {
      transformPageChunk: ({ html }) => html.replace('class=""', `class="${theme}"`)
    });
  }
  return await resolve(event);
};
const second = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event
  });
  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return session;
  };
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    }
  });
};
const handle = sequence(first, second);
export {
  handle
};
