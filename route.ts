import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // Test Select
        const { data: selectData, error: selectError } = await supabase.from('users').select('*').limit(1);

        // Test Insert (Fake user)
        const fakeId = "00000000-0000-0000-0000-000000000000";
        const { error: insertError } = await supabase.from('users').insert({
            id: fakeId,
            name: "Test Connection",
            email: "test_connection@example.com",
            password_hash: "hash"
        });

        // Clean up
        if (!insertError) {
            await supabase.from('users').delete().eq('id', fakeId);
        }

        return NextResponse.json({
            select: { data: selectData, error: selectError },
            insert: { error: insertError }
        });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
