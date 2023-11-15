module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  // eleventyConfig.addPassthroughCopy("toolbox");

  // Copy any .jpg/png file to `_site`, via Glob pattern
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.addPassthroughCopy("**/*.ico");

  // coding files
  eleventyConfig.addPassthroughCopy("**/*.py");
  eleventyConfig.addPassthroughCopy("**/*.sh");
  eleventyConfig.addPassthroughCopy("**/*.js");
  eleventyConfig.addPassthroughCopy("**/*.vim");
};