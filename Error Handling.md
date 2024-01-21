# Server Conditions

These do not reflect anything wrong with the client-side application and they should not cause client-side error handling to begin, i.e don't trigger error boundaries.

## Offline

It reflects a global condition so instead of having an indicator for every surface, we have a global indicator and use toasts to notify changes in the status. We continue to show existing data in all surfaces and if there is no existing data for a particular data it gets a banner.

## Authorization expired

We contine to show existing data, and if in a surface there is no existing data it gets a banner. This is a global condition so it gets a global indicator but no toast. Once we enter this status we disable all queries so no data is fetched until the user logs in again. We short-circuit all queries so they don't retry 3 times.

## Error updating data

When there is an error updating data, a banner appears above where the data usually goes, and if there is existing data we still show the existing data. We retry 3 times before showing this banner.

# Client Errors

We propogate to the nearest error boundary. Error boundaries should be placed for every route. The error boundary shows a text input where users can enter what was happening when the error occurs. These errors are distinct from server errors.
