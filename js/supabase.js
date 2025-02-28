import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Constante para o ID do administrador
// Substitua pelo seu ID de usuário real quando souber qual é
export const ADMIN_USER_ID = '9f657d83-d2ac-4629-a755-6fc4b37efe22';

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

export async function isAdmin() {
    const user = await getCurrentUser();
    return user && user.id === ADMIN_USER_ID;
}

// Memory functions
export async function createMemory(memory) {
    const user = await getCurrentUser();
    if (!user) {
        return { error: { message: 'Usuário não autenticado' } };
    }
    
    // Verificar se o usuário é administrador
    if (user.id !== ADMIN_USER_ID) {
        return { error: { message: 'Apenas o administrador pode adicionar memórias' } };
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
    // Agora qualquer pessoa pode ver as memórias, mesmo sem estar logada
    const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('date', { ascending: true });
    return { data, error };
}

export async function updateMemory(id, memory) {
    const user = await getCurrentUser();
    if (!user || user.id !== ADMIN_USER_ID) {
        return { error: { message: 'Apenas o administrador pode atualizar memórias' } };
    }
    
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
    const user = await getCurrentUser();
    if (!user || user.id !== ADMIN_USER_ID) {
        return { error: { message: 'Apenas o administrador pode excluir memórias' } };
    }
    
    const { error } = await supabase
        .from('memories')
        .delete()
        .eq('id', id);
    return { error };
}

// Storage functions
export async function uploadImage(file) {
    const user = await getCurrentUser();
    if (!user || user.id !== ADMIN_USER_ID) {
        return { error: { message: 'Apenas o administrador pode fazer upload de imagens' } };
    }
    
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