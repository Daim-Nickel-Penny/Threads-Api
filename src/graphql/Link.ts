import { arg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
  },
});

let links: NexusGenObjects["Link"][] = [
  {
    id: 1,
    url: "www.fshk.com",
    description: "dsgjkfh hsdjfhk",
  },
  {
    id: 2,
    url: "graphql.org",
    description: "GraphQL official website",
  },
];

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve(parent, args, context, info) {
        return context.prisma.link.findMany();
      },
    });
  },
});

export const LinkByIdQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("Link", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        const findId = args;
        const obj = links.filter((i, k) => i.id === findId.id);
        console.log(obj.length);
        return obj[0];
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },

      resolve(parent, args, context) {
        const newLink = context.prisma.link.create({
          data: {
            description: args.description,
            url: args.url,
          },
        });
        return newLink;
      },
    });
  },
});

export const LinkByIdMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("UpdateLink", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },

      resolve(parent, args, context, info) {
        const { id, description, url } = args;
        interface newDataObj {
          id: number;
          description: string;
          url: string;
        }

        let newData: newDataObj = { id: 0, description: "", url: "" };

        newData.description = description;
        newData.url = url;
        newData.id = id;

        links.map((i, k) => {
          if (i.id === id) {
            i.id = newData.id;
            i.description = newData.description;
            i.url = newData.url;
            // i = { ...i, ...newData };
          }
        });
        return newData;
      },
    });
  },
});
