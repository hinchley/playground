# Change Log

## [0.6.0] - 2022-01-10
### Added
- Added config file.

### Fixed
- Notes without tags were not displayed.

### Changed
- Separated initialisation of database schema from seeding.
- Refactor - consolidated routes and split admin controller.

## [0.5.0] - 2022-01-08
### Added
- Add pagination.
- Add config file.

### Changed
- Made q a required field when searching for a note.

## [0.4.0] - 2022-01-06
### Added
- Support adding tags to notes.

## [0.3.0] - 2022-01-03
### Added
- Session-based authentication. Required to access /admin. Hard-coded username and password for now.
- Avoid errors on favicon.ico requests.

### Changed
- Replaced redirects to home page and default admin page.

## [0.2.0] - 2022-01-02
### Added
- Notes search.

### Fixed
- Verion number in ChangeLog.md.

### Changed
- Updates to package.json.
- Made content a required field when editing a note.

## [0.1.0] - 2022-01-01
### Added
- Initial commit. Includes CRUD functions and public + admin views.