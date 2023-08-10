import os
import datetime

from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA = os.path.join(BASE_DIR, 'media')
UPLOADS = os.path.join(MEDIA, 'uploads')

def delete_old_files():
    """Deletes files that are older than 1 day."""
    today = datetime.datetime.today()
    one_day_ago = today - datetime.timedelta(minutes=3)

    for file in os.listdir("media/uploads"):
        file_path = os.path.join("media/uploads", file)
        file_date = os.path.getmtime(file_path)
        file_date = datetime.datetime.fromtimestamp(file_date)

        if file_date < one_day_ago:
            print("DELETING", file)
            os.remove(file_path)

if __name__ == "__main__":
    delete_old_files()