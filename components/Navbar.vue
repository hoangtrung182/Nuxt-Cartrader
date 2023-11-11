<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
    // 1. make user.value = null
    // 2. remove JWT from Cookiee browser
    // 3. navigate to home page
    const { error } = supabase.auth.signOut();

    if(error) {
        console.log(error);
    }

    // old version (fixed)
    // try {
    //     await $fetch('/api/_supabase/session', {
    //         method: 'POST',
    //         body: { event: 'SIGN_OUT', session: null}
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

    // user.value = null;
    navigateTo('/');
}

</script>

<template>
    <header class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md">
       <NuxtLink to="/" class="text-3xl font-bold font-mono">Cartrader</NuxtLink>
       <div class="flex" v-if="user">
            <NuxtLink to="/profile/listings" class="mr-5">Profile</NuxtLink>
            <p class="cursor-pointer" @click="logout">Logout</p>
        </div>
        <NuxtLink v-else to="/login">Login</NuxtLink>
   </header>
</template>