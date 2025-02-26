import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    return { data, error };
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    return { data, error };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Erro ao obter usuário atual:', error);
        return null;
    }
    return user;
}

// Memory functions
export async function createMemory(memory) {
    const user = await getCurrentUser();
    if (!user) {
        return { error: { message: 'Usuário não autenticado' } };
    }
    
    const { data, error } = await supabase
        .from('memories')
        .insert([{
            title: memory.title,
            description: memory.description,
            date: memory.date,
            image_url: memory.image_url,
            user_id: user.id
        }])
        .select();
    return { data, error };
}

export async function getMemories() {
    const user = await getCurrentUser();
    if (!user) {
        return { error: { message: 'Usuário não autenticado' } };
    }
    
    const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });
    return { data, error };
}

export async function updateMemory(id, memory) {
    const { data, error } = await supabase
        .from('memories')
        .update({
            title: memory.title,
            description: memory.description,
            date: memory.date,
            image_url: memory.image_url
        })
        .eq('id', id)
        .select();
    return { data, error };
}

export async function deleteMemory(id) {
    const { error } = await supabase
        .from('memories')
        .delete()
        .eq('id', id);
    return { error };
}

// Storage functions
export async function uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
        .from('memory-images')
        .upload(filePath, file);

    if (error) return { error };

    const { data: { publicUrl } } = supabase.storage
        .from('memory-images')
        .getPublicUrl(filePath);

    return { data: publicUrl, error: null };
}