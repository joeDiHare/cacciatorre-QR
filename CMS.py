import httplib2
import os
from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/sheets.googleapis.com-python-quickstart.json
SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'cacciaiot'


def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'sheets.googleapis.com-python-quickstart.json')

    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else:  # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials


def main():
    """Shows basic usage of the Sheets API.

    Creates a Sheets API service object and prints the names and majors of
    students in a sample spreadsheet:
    https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
    https://docs.google.com/spreadsheets/d/1hjM_5TLlXrg5Bi3VE3x7azqddlFmjHUgWsMmm5x9rNo/edit#gid=0
    """
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?'
                    'version=v4')
    service = discovery.build('sheets', 'v4', http=http,
                              discoveryServiceUrl=discoveryUrl)
    # 'https://docs.google.com/spreadsheets/d/  /edit#gid=385226661'
    spreadsheetId = '1hjM_5TLlXrg5Bi3VE3x7azqddlFmjHUgWsMmm5x9rNo'#'
    # spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
    rangeName = 'Sheet1!A2:BJ'
    result = service.spreadsheets().values().get(
        spreadsheetId=spreadsheetId, range=rangeName).execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
    else:
        # for row in values:
            # Print columns A and E, which correspond to indices 0 and 4.
            # print('%s, %s' % (row[0], row[4]))
        import csv
        with open('res_cacciaiot.csv', 'w', newline='') as fp:
            a = csv.writer(fp, delimiter=',')
            a.writerows(values)

    # Do 2nd sheet (LOG)
    rangeName2 = 'LOG!A2:O'
    result2 = service.spreadsheets().values().get(
        spreadsheetId=spreadsheetId, range=rangeName2).execute()
    values2 = result2.get('values', [])

    if not values2:
        print('No data found.')
    else:
        # for row in values:
        # Print columns A and E, which correspond to indices 0 and 4.
        # print('%s, %s' % (row[0], row[4]))
        import csv
        with open('log_cacciaiot.csv', 'w', newline='') as fp:
            a = csv.writer(fp, delimiter=',')
            a.writerows(values2)

    return 'ok!'
if __name__ == '__main__':
    main()


# import gspread
#
# from oauth2client.service_account import ServiceAccountCredentials
#
# scope = ['https://spreadsheets.google.com/feeds']
#
# credentials = ServiceAccountCredentials.from_json_keyfile_name('CacciaIoT-6e9f013f8761.json', scope)
#
# gc = gspread.authorize(credentials)
#
# # wks = gc.open("Where is the money Lebowski?").sheet1
# #
# # AIzaSyDkf003a1BHS3n1pjBGU7Vt-NPtX8bOS9U
# # cacciaiot-1480719489911
# # 301001417702-compute@developer.gserviceaccount.com
# # gc = gspread.authorize(credentials)
#
# # If you want to be specific, use a key (which can be extracted from
# # the spreadsheet's url)
#
# # sht1 = gc.open('caccia_leaderboard.gsheet').sheet1
# sht1 = gc.open_by_key('https://docs.google.com/spreadsheets/d/1hjM_5TLlXrg5Bi3VE3x7azqddlFmjHUgWsMmm5x9rNo/edit?usp=sharing')
