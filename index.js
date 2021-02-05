const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const fs = require('fs');
const path = require('path');

const got = require('got');
const tar = require('tar-stream');

try {
  const useES5 = core.getInput('use-es5');
  const token = core.getInput('token');
  const dest = core.getInput('dest');
  
  git.Clone(github.context.payload.repository.html_url)
  
  const octokit = github.getOctokit(token)
  
  const currentReleaseVersion = octokit.repos.getLatestRelease(github.context.repo).tag_name;
  
  const latestDistRelease = octokit.repos.listTags({
    'mozilla',
    'pdfjs-dist',
  }).reduce((v1, v2) => semver.gt(v2.name, v1.name) ? v2 : v1);
  
  const latestDistReleaseVersion = latestDistRelease.name;
  
  if(semver.gt(currentRelease, latestDistTag)) {
    const extractFileNameExp = new RegExp('^mozilla-pdfjs-dist-.+?\/' + (useES5 ? 'es5\/build' : 'build'));
    const extract = tar.extract();
    extract.on('entry', function(header, stream, next) {
      if(header.type == 'file' && extractFileNameExp.test(header.name)) {
        stream.pipe(fs.createWriteStream(path.join(path.basename(header.name))));
      }
    });
    got.stream(latestDistRelease.tarball).pipe(extract);
  }
} catch (error) {
  core.setFailed(error.message);
}