<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { UserCircle, LogOut } from 'lucide-vue-next'
import { Avatar } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/auth'
import { initials } from '@/lib/initials'

const router = useRouter()
const auth = useAuthStore()
const displayName = computed(() => auth.user?.name ?? 'Account')
const avatarInitials = computed(() => initials(displayName.value))

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button type="button" class="relative rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        <Avatar>{{ avatarInitials }}</Avatar>
        <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuLabel>{{ displayName }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="router.push('/profile')">
        <UserCircle class="h-4 w-4" />
        Profile
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="text-destructive focus:text-destructive" @click="logout">
        <LogOut class="h-4 w-4" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
