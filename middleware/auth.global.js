export default defineNuxtRouteMiddleware((to, from) => {
    // Define route to protect
    if(to.path.includes('profile')) {
        const user = useSupabaseUser();
        if(user.value) {
            return;
        }
        return navigateTo('/login');
    }
})
