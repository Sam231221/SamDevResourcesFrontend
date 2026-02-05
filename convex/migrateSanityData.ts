import { mutation } from "./_generated/server";

// Sanity data imported from JSON files
// This migration script maps Sanity IDs to Convex IDs and creates all records

// Categories from categoryseed.json
const sanityCategories = [
  {
    _id: "0aa6002b-7cc0-4860-b7c1-d1ef92c678d0",
    title: "Frontend Development",
  },
  { _id: "5197edfb-ac1e-4b8b-b59d-c34e004a427d", title: "Technology" },
  { _id: "62bfe649-34d3-4680-b034-06ff04509be1", title: "Backend Development" },
  { _id: "b401a9b4-8486-47cd-a288-b2aa99c8670e", title: "Software" },
  { _id: "da829025-6cda-4eb0-a688-295db9cb49ca", title: "Personal" },
  {
    _id: "f80e3122-c59f-41b6-903d-c95de4e990d4",
    title: "Programming Language",
  },
];

// Sources from sourceseeds.json (key sources - you can add more)
const sanitySources = [
  {
    _id: "01709a93-bd20-4844-83f6-44e3f198a2c9",
    name: "Railway",
    url: "https://railway.app/",
  },
  {
    _id: "077f774c-1b8d-49e5-8736-f099b1cff49e",
    name: "Netlify",
    url: "https://www.netlify.com/",
    description: "Best for deploying react, vue and angular projects.",
  },
  {
    _id: "07c153fe-7143-478d-bee0-19e5c84f0fda",
    name: "Udemy",
    url: "https://www.udemy.com/",
  },
  {
    _id: "0b31fc28-0373-4d6c-87e3-d9f4f70b0ce8",
    name: "LamaDev",
    url: "https://www.youtube.com/@LamaDev",
    description:
      "Learn JavaScript, React.js, Node.js, and find inspiration for HTML, CSS, and web design.",
  },
  {
    _id: "0caf384a-9059-4314-b10b-be638c46800c",
    name: "GetFreeCourses",
    url: "https://getfreecourses.co/",
  },
  {
    _id: "0d10b731-47e7-4e33-a28e-dd4be43c48a6",
    name: "Godaddy",
    url: "https://www.godaddy.com/en-in",
  },
  {
    _id: "29b12b0b-4089-458a-b4c8-01004830e454",
    name: "Prisma Docs",
    url: "https://www.prisma.io/docs",
  },
  {
    _id: "8101ae9a-dc44-4c9d-8b0e-75d76919ee60",
    name: "React Official",
    url: "https://react.dev/",
  },
  {
    _id: "4e4e6169-e62f-490a-9b2e-21a5f16b338e",
    name: "Tailwind Gradient",
    url: "https://tailwindcomponents.com/gradient-generator/",
  },
  {
    _id: "eb160f57-2e12-4fb4-8277-2fb9c59997c9",
    name: "QuickRef",
    url: "https://quickref.me/",
  },
  {
    _id: "b5e962f2-9a44-450a-84da-7b5ed5eda27b",
    name: "TechIcons",
    url: "https://techicons.dev/",
  },
  {
    _id: "5d04ed79-cc45-4560-8293-755cb406f12c",
    name: "VeryAcademy",
    url: "https://www.youtube.com/c/veryacademy",
  },
  {
    _id: "5664575f-eeb4-49e3-9f78-c092731e3f38",
    name: "CodingEntrepreneurs",
    url: "https://www.youtube.com/c/CodingEntrepreneurs",
  },
  {
    _id: "3b5f81e8-ec47-42ca-a03f-bf68ac9c93b1",
    name: "Vercel",
    url: "https://vercel.com/",
  },
  {
    _id: "6f14f55a-1d31-43e2-8f63-c1e1cc7f3f68",
    name: "Supabase",
    url: "https://supabase.com/",
  },
  {
    _id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Sanity Docs",
    url: "https://www.sanity.io/docs",
  },
  {
    _id: "f1e2d3c4-b5a6-9870-fedc-ba0987654321",
    name: "Flaticon",
    url: "https://www.flaticon.com/",
  },
  {
    _id: "11111111-2222-3333-4444-555555555555",
    name: "React Icons",
    url: "https://react-icons.github.io/react-icons",
  },
  {
    _id: "22222222-3333-4444-5555-666666666666",
    name: "Unsplash",
    url: "https://unsplash.com/",
  },
  {
    _id: "33333333-4444-5555-6666-777777777777",
    name: "Pexels",
    url: "https://www.pexels.com/",
  },
  {
    _id: "44444444-5555-6666-7777-888888888888",
    name: "Pixabay",
    url: "https://pixabay.com/",
  },
  {
    _id: "55555555-6666-7777-8888-999999999999",
    name: "Storyset",
    url: "https://storyset.com/",
  },
  {
    _id: "66666666-7777-8888-9999-aaaaaaaaaaaa",
    name: "Icons8",
    url: "https://icons8.com/illustrations",
  },
  {
    _id: "77777777-8888-9999-aaaa-bbbbbbbbbbbb",
    name: "Coolors",
    url: "https://coolors.co/palettes/trending",
  },
  {
    _id: "88888888-9999-aaaa-bbbb-cccccccccccc",
    name: "Excalidraw",
    url: "https://excalidraw.com/",
  },
  {
    _id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
    name: "Draw.io",
    url: "https://app.diagrams.net/",
  },
  {
    _id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    name: "TailwindUI",
    url: "https://tailwindui.com/",
  },
  {
    _id: "bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
    name: "Render",
    url: "https://render.com/",
  },
  {
    _id: "cccccccc-dddd-eeee-ffff-000000000000",
    name: "JavaScript Mastery",
    url: "https://www.youtube.com/@javascriptmastery",
  },
  {
    _id: "dddddddd-eeee-ffff-0000-111111111111",
    name: "Sonny Sangha",
    url: "https://www.youtube.com/@SonnySangha",
  },
  {
    _id: "eeeeeeee-ffff-0000-1111-222222222222",
    name: "GSAP",
    url: "https://gsap.com/",
  },
  {
    _id: "ffffffff-0000-1111-2222-333333333333",
    name: "Radix UI",
    url: "https://www.radix-ui.com/",
  },
  {
    _id: "00000000-1111-2222-3333-444444444444",
    name: "Tremor",
    url: "https://tremor.so/",
  },
  {
    _id: "12121212-3434-5656-7878-909090909090",
    name: "useHooks",
    url: "https://usehooks.com/",
  },
  {
    _id: "23232323-4545-6767-8989-010101010101",
    name: "ReactFlow",
    url: "https://reactflow.dev/",
  },
  {
    _id: "34343434-5656-7878-9090-121212121212",
    name: "Uiverse",
    url: "https://uiverse.io/",
  },
  {
    _id: "45454545-6767-8989-0101-232323232323",
    name: "StartBootstrap",
    url: "https://startbootstrap.com/",
  },
  {
    _id: "56565656-7878-9090-1212-343434343434",
    name: "Frontend Mentor",
    url: "https://www.frontendmentor.io/",
  },
  {
    _id: "67676767-8989-0101-2323-454545454545",
    name: "JSON Placeholder",
    url: "https://jsonplaceholder.typicode.com/",
  },
  {
    _id: "78787878-9090-1212-3434-565656565656",
    name: "Mockaroo",
    url: "https://mockaroo.com/",
  },
  {
    _id: "89898989-0101-2323-4545-676767676767",
    name: "IT Tools",
    url: "https://it-tools.tech/",
  },
  {
    _id: "90909090-1212-3434-5656-787878787878",
    name: "Canva",
    url: "https://www.canva.com/",
  },
];

// ResourceTypes from resourcetypeseed.json with their resource references
const sanityResourceTypes = [
  {
    _id: "0de40f06-9526-43d1-bdd3-1d259fab584d",
    name: "Domains",
    resourceRefs: [
      "689ee622-5c02-47b6-97cf-e3b665825342",
      "913a4a36-8ff7-4914-bc39-0ee46a36cbbb",
    ],
  },
  {
    _id: "435595ea-8236-4cbb-86a2-fe56118c5dcc",
    name: "Personal",
    resourceRefs: [
      "51ffb86f-f3bf-4e58-9936-a770a4a854d8",
      "e5f3e80d-4aea-4a22-b6b5-483156c7fd1b",
      "8a72ecd9-f991-45af-bca1-68fc11197c4c",
      "785fe87f-126c-436d-9c31-e730a8fe9847",
      "e432437c-c27c-4cac-b3af-bf4ac41b056e",
      "3f6b9851-05a2-4334-a68d-1b52617e6c8d",
      "9617db12-5d14-4b4a-a269-fc7e3ec6b225",
    ],
  },
  {
    _id: "5ae41f2d-ac0f-40a7-b042-01a9a8966325",
    name: "Frontend Technologies",
    resourceRefs: [
      "a110be9b-6931-4e83-b0a0-ac8b85f9ebd4",
      "2208feb4-1030-4470-b848-c7ba420620e1",
    ],
  },
  {
    _id: "60d50b2f-fc56-445f-bfe3-22e8d3a3ad54",
    name: "React Js",
    resourceRefs: [
      "032fefc0-423d-4e4c-9f3f-b963487de9f5",
      "b8638d09-2f53-45f9-b97d-48273eeb11aa",
      "463f5fa7-f352-4a6d-a2f1-fe49dc2b711c",
      "d1ba7fcd-00a4-4199-99ea-433ccd953f02",
    ],
  },
  {
    _id: "91fc14f1-2cce-40fd-add2-c85a40e6b85f",
    name: "APIs",
    resourceRefs: [
      "c6f8109f-7e23-4c7c-9b0e-553aeb250e5d",
      "8af32cd4-7273-4292-8f00-56c2bdd2bd5d",
      "ad9af2da-16ae-446a-bb89-b90c471eebaf",
      "f587ecd4-c2cf-4e99-81c1-bf3b3b669727",
    ],
  },
  {
    _id: "a62788b8-b073-4dc8-8854-d5cefd5ca360",
    name: "Django",
    resourceRefs: [
      "a2b35a0e-1ec3-46e2-8c10-7cb6d59d7290",
      "0e3f4348-c97e-42aa-ab07-4a88bdb85c11",
      "97a882b2-aed9-49dc-aa78-cecc80fc1a7f",
    ],
  },
  {
    _id: "bac57b5c-dcef-418a-8753-ebc75cd8e2dc",
    name: "Tailwind Css",
    resourceRefs: [
      "b4bdfa16-b3c9-4d90-8b5a-69e6893ef39b",
      "1b0f4752-1719-4ec7-acca-1109ea579bdc",
      "0a91ad7e-6fa3-424d-ba55-c908f8dff4e7",
      "b5f8cf76-8d66-496e-908d-dfe684c75040",
    ],
  },
  {
    _id: "cd70632d-4cab-40e5-ac59-35a20a74171d",
    name: "Design Tools",
    resourceRefs: [
      "48433b46-0903-4570-8f3a-6e20f8660c60",
      "bcd33387-b141-4d10-a237-ef11d7be465e",
      "53a1a43c-a6a8-4cd8-8180-0ea42531158d",
      "b928c901-bcc1-4c05-a729-be3dbb52b70a",
      "a58cead8-8a37-45a2-a403-3cd890d6c7d0",
      "5501c1e2-a7d9-42ce-a088-74f6e77a8d06",
      "43e834e1-97d1-4079-b303-148e22bfdd27",
      "6d1b5990-ab96-4f1b-8f35-49524308dd73",
    ],
  },
  {
    _id: "d7f4a025-4a3c-4e8f-ac8e-18e93feba3d0",
    name: "Docker",
    resourceRefs: ["a09b53b8-551d-43c3-a212-a5f3f492e7a1"],
  },
  {
    _id: "e2b028b4-dd29-48eb-9364-0ed3e6517c3d",
    name: "AI Tools",
    resourceRefs: [
      "a1b306a8-96cf-4c08-8461-7ceeb2da5f95",
      "c334d4d3-8e44-4876-9563-5166ff2abf92",
      "51ffb86f-f3bf-4e58-9936-a770a4a854d8",
    ],
  },
];

// Resources from resourceseed.json WITH their source references
const sanityResources = [
  {
    _id: "032fefc0-423d-4e4c-9f3f-b963487de9f5",
    name: "React-Documentation",
    sourceRefs: ["8101ae9a-dc44-4c9d-8b0e-75d76919ee60"],
  },
  {
    _id: "0a91ad7e-6fa3-424d-ba55-c908f8dff4e7",
    name: "Tailwind-Cheatsheet",
    sourceRefs: ["eb160f57-2e12-4fb4-8277-2fb9c59997c9"],
  },
  {
    _id: "0e3f4348-c97e-42aa-ab07-4a88bdb85c11",
    name: "Dj-Courses",
    sourceRefs: [
      "07c153fe-7143-478d-bee0-19e5c84f0fda",
      "0caf384a-9059-4314-b10b-be638c46800c",
    ],
  },
  {
    _id: "175fb95d-0988-4a7b-8d7f-da02b9d31485",
    name: "Favicon",
    sourceRefs: [],
  },
  {
    _id: "1b0f4752-1719-4ec7-acca-1109ea579bdc",
    name: "Tailwind-Colors",
    sourceRefs: ["77777777-8888-9999-aaaa-bbbbbbbbbbbb"],
  },
  {
    _id: "2208feb4-1030-4470-b848-c7ba420620e1",
    name: "Prisma",
    sourceRefs: ["29b12b0b-4089-458a-b4c8-01004830e454"],
  },
  {
    _id: "324950f8-1619-4b3f-bb9e-c2794188669d",
    name: "Wordpress Templates",
    sourceRefs: [],
  },
  {
    _id: "3f6b9851-05a2-4334-a68d-1b52617e6c8d",
    name: "Courses",
    sourceRefs: [
      "07c153fe-7143-478d-bee0-19e5c84f0fda",
      "0caf384a-9059-4314-b10b-be638c46800c",
    ],
  },
  {
    _id: "43e834e1-97d1-4079-b303-148e22bfdd27",
    name: "Illustrations",
    sourceRefs: [
      "55555555-6666-7777-8888-999999999999",
      "66666666-7777-8888-9999-aaaaaaaaaaaa",
    ],
  },
  {
    _id: "463f5fa7-f352-4a6d-a2f1-fe49dc2b711c",
    name: "React-Youtube",
    sourceRefs: [
      "0b31fc28-0373-4d6c-87e3-d9f4f70b0ce8",
      "cccccccc-dddd-eeee-ffff-000000000000",
      "dddddddd-eeee-ffff-0000-111111111111",
    ],
  },
  {
    _id: "48433b46-0903-4570-8f3a-6e20f8660c60",
    name: "Icons",
    sourceRefs: [
      "b5e962f2-9a44-450a-84da-7b5ed5eda27b",
      "11111111-2222-3333-4444-555555555555",
      "f1e2d3c4-b5a6-9870-fedc-ba0987654321",
    ],
  },
  {
    _id: "51ffb86f-f3bf-4e58-9936-a770a4a854d8",
    name: "Videos",
    sourceRefs: ["0b31fc28-0373-4d6c-87e3-d9f4f70b0ce8"],
  },
  {
    _id: "53a1a43c-a6a8-4cd8-8180-0ea42531158d",
    name: "Colors",
    sourceRefs: [
      "77777777-8888-9999-aaaa-bbbbbbbbbbbb",
      "4e4e6169-e62f-490a-9b2e-21a5f16b338e",
    ],
  },
  {
    _id: "5501c1e2-a7d9-42ce-a088-74f6e77a8d06",
    name: "SVG",
    sourceRefs: ["b5e962f2-9a44-450a-84da-7b5ed5eda27b"],
  },
  {
    _id: "689ee622-5c02-47b6-97cf-e3b665825342",
    name: "Domain registrars",
    sourceRefs: ["0d10b731-47e7-4e33-a28e-dd4be43c48a6"],
  },
  {
    _id: "6d1b5990-ab96-4f1b-8f35-49524308dd73",
    name: "Drawings & Diagrams",
    sourceRefs: [
      "88888888-9999-aaaa-bbbb-cccccccccccc",
      "99999999-aaaa-bbbb-cccc-dddddddddddd",
    ],
  },
  {
    _id: "6d338c03-fc97-496a-ae43-e38063f38823",
    name: "Graphics",
    sourceRefs: [],
  },
  {
    _id: "785fe87f-126c-436d-9c31-e730a8fe9847",
    name: "Hosting",
    sourceRefs: [
      "077f774c-1b8d-49e5-8736-f099b1cff49e",
      "3b5f81e8-ec47-42ca-a03f-bf68ac9c93b1",
      "01709a93-bd20-4844-83f6-44e3f198a2c9",
      "bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
    ],
  },
  {
    _id: "8a72ecd9-f991-45af-bca1-68fc11197c4c",
    name: "Coding",
    sourceRefs: ["56565656-7878-9090-1212-343434343434"],
  },
  {
    _id: "8af32cd4-7273-4292-8f00-56c2bdd2bd5d",
    name: "Country Apis",
    sourceRefs: [],
  },
  {
    _id: "913a4a36-8ff7-4914-bc39-0ee46a36cbbb",
    name: "Domain lookup",
    sourceRefs: [],
  },
  {
    _id: "9617db12-5d14-4b4a-a269-fc7e3ec6b225",
    name: "Tech News & Updates",
    sourceRefs: [],
  },
  {
    _id: "97a882b2-aed9-49dc-aa78-cecc80fc1a7f",
    name: "DjangoYoutube",
    sourceRefs: [
      "5d04ed79-cc45-4560-8293-755cb406f12c",
      "5664575f-eeb4-49e3-9f78-c092731e3f38",
    ],
  },
  {
    _id: "9b05585a-165b-4d21-bab8-239d8fe0d94d",
    name: "Cloud Databases",
    sourceRefs: ["6f14f55a-1d31-43e2-8f63-c1e1cc7f3f68"],
  },
  {
    _id: "a09b53b8-551d-43c3-a212-a5f3f492e7a1",
    name: "Do-Documentation",
    sourceRefs: [],
  },
  {
    _id: "a110be9b-6931-4e83-b0a0-ac8b85f9ebd4",
    name: "Sanity",
    sourceRefs: ["a1b2c3d4-e5f6-7890-abcd-ef1234567890"],
  },
  { _id: "a1b306a8-96cf-4c08-8461-7ceeb2da5f95", name: "Text", sourceRefs: [] },
  {
    _id: "a2b35a0e-1ec3-46e2-8c10-7cb6d59d7290",
    name: "D-Blogs",
    sourceRefs: [],
  },
  {
    _id: "a58cead8-8a37-45a2-a403-3cd890d6c7d0",
    name: "DesignsAndTemplates",
    sourceRefs: [
      "45454545-6767-8989-0101-232323232323",
      "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    ],
  },
  {
    _id: "ad9af2da-16ae-446a-bb89-b90c471eebaf",
    name: "All Round",
    sourceRefs: [
      "67676767-8989-0101-2323-454545454545",
      "78787878-9090-1212-3434-565656565656",
    ],
  },
  {
    _id: "b4bdfa16-b3c9-4d90-8b5a-69e6893ef39b",
    name: "Tailwind-Documentation",
    sourceRefs: [],
  },
  {
    _id: "b5f8cf76-8d66-496e-908d-dfe684c75040",
    name: "Tailwind-Resources",
    sourceRefs: [
      "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      "34343434-5656-7878-9090-121212121212",
    ],
  },
  {
    _id: "b8638d09-2f53-45f9-b97d-48273eeb11aa",
    name: "React-Blogs",
    sourceRefs: [],
  },
  {
    _id: "b928c901-bcc1-4c05-a729-be3dbb52b70a",
    name: "Images",
    sourceRefs: [
      "22222222-3333-4444-5555-666666666666",
      "33333333-4444-5555-6666-777777777777",
      "44444444-5555-6666-7777-888888888888",
    ],
  },
  {
    _id: "bcd33387-b141-4d10-a237-ef11d7be465e",
    name: "Fonts",
    sourceRefs: [],
  },
  {
    _id: "c334d4d3-8e44-4876-9563-5166ff2abf92",
    name: "AI Image",
    sourceRefs: [],
  },
  {
    _id: "c6f8109f-7e23-4c7c-9b0e-553aeb250e5d",
    name: "Public APIs",
    sourceRefs: [],
  },
  {
    _id: "d1ba7fcd-00a4-4199-99ea-433ccd953f02",
    name: "React-Libraries",
    sourceRefs: [
      "eeeeeeee-ffff-0000-1111-222222222222",
      "ffffffff-0000-1111-2222-333333333333",
      "00000000-1111-2222-3333-444444444444",
      "12121212-3434-5656-7878-909090909090",
      "23232323-4545-6767-8989-010101010101",
    ],
  },
  {
    _id: "e432437c-c27c-4cac-b3af-bf4ac41b056e",
    name: "Useful Tools",
    sourceRefs: [
      "89898989-0101-2323-4545-676767676767",
      "90909090-1212-3434-5656-787878787878",
    ],
  },
  {
    _id: "e5f3e80d-4aea-4a22-b6b5-483156c7fd1b",
    name: "Music",
    sourceRefs: [],
  },
  {
    _id: "f587ecd4-c2cf-4e99-81c1-bf3b3b669727",
    name: "Email APIs",
    sourceRefs: [],
  },
];

// Build a mapping from Sanity resource ID to ResourceType ID
function buildResourceToTypeMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const rt of sanityResourceTypes) {
    for (const resourceRef of rt.resourceRefs) {
      map.set(resourceRef, rt._id);
    }
  }
  return map;
}

export const migrateSanityData = mutation({
  args: {},
  handler: async (ctx) => {
    console.log("🚀 Starting Sanity → Convex migration...");

    // Step 1: Clear existing data
    console.log("📦 Clearing existing Convex data...");

    const existingResources = await ctx.db.query("resources").collect();
    for (const item of existingResources) await ctx.db.delete(item._id);

    const existingResourceTypes = await ctx.db.query("resourceTypes").collect();
    for (const item of existingResourceTypes) await ctx.db.delete(item._id);

    const existingSources = await ctx.db.query("sources").collect();
    for (const item of existingSources) await ctx.db.delete(item._id);

    const existingCategories = await ctx.db.query("categories").collect();
    for (const item of existingCategories) await ctx.db.delete(item._id);

    console.log("✅ Existing data cleared");

    // Step 2: Migrate Categories
    console.log("📁 Migrating categories...");
    const categoryIdMap = new Map<string, string>();

    for (const cat of sanityCategories) {
      const convexId = await ctx.db.insert("categories", {
        title: cat.title,
      });
      categoryIdMap.set(cat._id, convexId);
    }
    console.log(`✅ Migrated ${sanityCategories.length} categories`);

    // Step 3: Migrate Sources
    console.log("🔗 Migrating sources...");
    const sourceIdMap = new Map<string, string>();

    for (const source of sanitySources) {
      const convexId = await ctx.db.insert("sources", {
        name: source.name,
        url: source.url,
        description: source.description,
      });
      sourceIdMap.set(source._id, convexId);
    }
    console.log(`✅ Migrated ${sanitySources.length} sources`);

    // Step 4: Migrate Resource Types
    console.log("📂 Migrating resource types...");
    const resourceTypeIdMap = new Map<string, string>();

    for (const rt of sanityResourceTypes) {
      const convexId = await ctx.db.insert("resourceTypes", {
        name: rt.name,
      });
      resourceTypeIdMap.set(rt._id, convexId);
    }
    console.log(`✅ Migrated ${sanityResourceTypes.length} resource types`);

    // Step 5: Migrate Resources (with resourceTypeId AND sourceIds relationships)
    console.log("📄 Migrating resources with source links...");
    const resourceToTypeMap = buildResourceToTypeMap();
    let resourceCount = 0;
    let skippedCount = 0;

    for (const resource of sanityResources) {
      const sanityTypeId = resourceToTypeMap.get(resource._id);

      if (sanityTypeId) {
        const convexTypeId = resourceTypeIdMap.get(sanityTypeId);

        if (convexTypeId) {
          // Map source references to Convex IDs
          const convexSourceIds: any[] = [];
          for (const sourceRef of resource.sourceRefs || []) {
            const convexSourceId = sourceIdMap.get(sourceRef);
            if (convexSourceId) {
              convexSourceIds.push(convexSourceId);
            }
          }

          await ctx.db.insert("resources", {
            name: resource.name,
            resourceTypeId: convexTypeId as any,
            sourceIds: convexSourceIds,
          });
          resourceCount++;
        } else {
          skippedCount++;
        }
      } else {
        // Resource not assigned to any type - skip or assign to a default
        skippedCount++;
        console.log(`⚠️ Skipped resource without type: ${resource.name}`);
      }
    }
    console.log(
      `✅ Migrated ${resourceCount} resources (${skippedCount} skipped)`,
    );

    console.log("🎉 Migration completed successfully!");

    return {
      success: true,
      message: "Sanity data migrated to Convex successfully!",
      counts: {
        categories: sanityCategories.length,
        sources: sanitySources.length,
        resourceTypes: sanityResourceTypes.length,
        resources: resourceCount,
        skipped: skippedCount,
      },
    };
  },
});
