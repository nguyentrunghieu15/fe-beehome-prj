<template>
    <SideBar></SideBar>
    <div class="p-4 sm:ml-64">
        <div class="mx-4 my-4 flex items-center justify-end md:mx-6">
            <Popover v-slot="{ open }" class="relative">
                <PopoverButton
                    :class="open ? 'text-white' : 'text-white/90'"
                    class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    <BellIcon
                        :class="open ? 'text-orange-300' : 'text-orange-300/70'"
                        class="ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-blue-400"
                        aria-hidden="true"
                    />
                </PopoverButton>

                <transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="translate-y-1 opacity-0"
                    enter-to-class="translate-y-0 opacity-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="translate-y-0 opacity-100"
                    leave-to-class="translate-y-1 opacity-0"
                >
                    <PopoverPanel
                        class="absolute right-0 z-10 mt-3 origin-top-right w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl"
                    >
                        <div
                            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
                        >
                            <div
                                class="relative grid gap-8 bg-white p-7 lg:grid-cols-2"
                            >
                                <a
                                    v-for="item in solutions"
                                    :key="item.name"
                                    :href="item.href"
                                    class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                >
                                    <div
                                        class="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12"
                                    >
                                        <div v-html="item.icon"></div>
                                    </div>
                                    <div class="ml-4">
                                        <p
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            {{ item.name }}
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            {{ item.description }}
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div class="bg-gray-50 p-4">
                                <a
                                    href="##"
                                    class="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                >
                                    <span class="flex items-center">
                                        <span
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            Documentation
                                        </span>
                                    </span>
                                    <span class="block text-sm text-gray-500">
                                        Start integrating products and tools
                                    </span>
                                </a>
                            </div>
                        </div>
                    </PopoverPanel>
                </transition>
            </Popover>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
                <div>
                    <MenuButton
                        class="relative flex max-w-xs items-center rounded-full bg-blue-400 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    >
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">Open user menu</span>
                        <img
                            class="h-8 w-8 rounded-full"
                            :src="user.imageUrl"
                            alt=""
                        />
                    </MenuButton>
                </div>
                <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                >
                    <MenuItems
                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <MenuItem
                            v-for="item in userNavigation"
                            :key="item.name"
                            v-slot="{ active }"
                        >
                            <a
                                :href="item.href"
                                :class="[
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                ]"
                                >{{ item.name }}</a
                            >
                        </MenuItem>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
        <slot>
            <RouterView></RouterView>
        </slot>
    </div>
</template>

<script setup lang="ts">
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverPanel,
} from "@headlessui/vue";
import { BellIcon } from "@heroicons/vue/24/outline";
import SideBar from "./components/SideBar.vue";
const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
    { name: "Reports", href: "#", current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];
const solutions = [
    {
        name: "Insights",
        description: "Measure actions your users take",
        href: "##",
        icon: `
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
          stroke="#FB923C"
          stroke-width="2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
          stroke="#FDBA74"
          stroke-width="2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
          stroke="#FDBA74"
          stroke-width="2"
        />
      </svg>
    `,
    },
    {
        name: "Automations",
        description: "Create your own targeted content",
        href: "##",
        icon: `
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
          stroke="#FB923C"
          stroke-width="2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
          stroke="#FDBA74"
          stroke-width="2"
        />
      </svg>
    `,
    },
    {
        name: "Reports",
        description: "Keep track of your growth",
        href: "##",
        icon: `
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
        <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
        <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
        <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
        <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
        <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
      </svg>
    `,
    },
];
</script>
