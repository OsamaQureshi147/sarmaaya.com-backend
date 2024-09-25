import { applyDecorators, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from './supabase-auth.guard';


export function SupabaseAuth() {
  return applyDecorators(UseGuards(SupabaseAuthGuard));
}
