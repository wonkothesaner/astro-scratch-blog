// Site-side renderers for the site-blocks plugin, keyed by block `_type`.
// EmDash imports `blockComponents` from here and merges it into <PortableText>.
import GroupBreak from "./GroupBreak.astro";
import StyledHeading from "./StyledHeading.astro";

export const blockComponents = {
  groupBreak: GroupBreak,
  styledHeading: StyledHeading,
};
