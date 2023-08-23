#!/usr/bin/env bash
##############################################################################
# Usage: ./create-packages.sh
# Creates packages for easy download during the workshop
##############################################################################

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

target_folder=dist

rm -rf "$target_folder"
mkdir -p "$target_folder"

copyFolder() {
  local src="$1"
  local dest="$target_folder/${2:-}"
  find "$src" -type d -not -path '*node_modules*' -not -path '*/.git' -not -path '*.git/*' -not -path '*/dist' -not -path '*dist/*' -exec mkdir -p '{}' "$dest/{}" ';'
  find "$src" -type f -not -path '*node_modules*' -not -path '*.git/*' -not -path '*dist/*' -exec cp -r '{}' "$dest/{}" ';'
}

makeArchive() {
  local src="$1"
  local name="${2:-$src}"
  local archive="$name.tar.gz"
  local cwd="${3:-}"
  echo "Creating $archive..."
  if [[ -n "$cwd" ]]; then
    pushd "$target_folder/$cwd" >/dev/null
    tar -czvf "../$archive" "$src"
    popd
    rm -rf "$target_folder/${cwd:?}"
  else
    pushd "$target_folder/$cwd" >/dev/null
    tar -czvf "$archive" "$src"
    popd
    rm -rf "$target_folder/${src:?}"
  fi
}

##############################################################################
# Complete solution
##############################################################################

echo "Creating solution package..."
copyFolder . solution
rm -rf "$target_folder/solution/docs"
rm -rf "$target_folder/solution/scripts"
rm -rf "$target_folder/solution/src/webapp"
rm -rf "$target_folder/solution/.github/workflows/packages.yml"
rm -rf "$target_folder/solution/.github/workflows/azure-static-web-apps.yml"
rm -rf "$target_folder/solution/SUPPORT.md"
rm -rf "$target_folder/solution/CODE_OF_CONDUCT.md"
rm -rf "$target_folder/solution/SECURITY.md"
makeArchive . solution/src solution

##############################################################################
# Webapp
##############################################################################

echo "Creating webapp package..."
copyFolder src/webapp
makeArchive src webapp