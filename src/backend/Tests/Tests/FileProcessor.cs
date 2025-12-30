
using System.Text;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace ZLBlog.Tests.Tests
{
    internal static class FileProcessor
    {

        public static class ExcelOpenXml2Csv
        {
            /// <summary>
            /// Convert every worksheet of an Excel workbook to a single CSV file
            /// (append sheets one after another).
            /// </summary>
            /// <param name="xlsxPath">Path of the source .xlsx</param>
            /// <param name="csvPath">Destination CSV file path</param>
            /// <param name="includeSheetNameColumn">
            ///     If true, a first column containing the sheet name is prepended.
            /// </param>
            public static void Convert(string xlsxPath, string csvPath, bool includeSheetNameColumn = false)
            {
                using var doc = SpreadsheetDocument.Open(xlsxPath, false);
                using var writer = new StreamWriter(csvPath, false,
                                     new UTF8Encoding(encoderShouldEmitUTF8Identifier: true)); // UTF-8 BOM

                var sst = doc.WorkbookPart!
                             .GetPartsOfType<SharedStringTablePart>()
                             ?.FirstOrDefault()?.SharedStringTable;

                //using var writer = new StreamWriter(csvPath, false,
                //                 new UTF8Encoding(encoderShouldEmitUTF8Identifier: false));

                foreach (Sheet sheet in doc.WorkbookPart!.Workbook.Sheets!)
                {
                    var wsPart = (WorksheetPart)doc.WorkbookPart.GetPartById(sheet.Id!);
                    foreach (Row row in wsPart.Worksheet.GetFirstChild<SheetData>()!.Elements<Row>())
                    {
                        var fields = new List<string>();
                        foreach (Cell cell in row.Elements<Cell>())
                            fields.Add(Escape(ReadCellText(cell, sst)));

                        writer.WriteLine(string.Join(',', fields));
                    }
                }
            }

            // ---------- helpers ------------------------------------------------------

            private static string ReadCellText(Cell cell, SharedStringTable? sst)
            {
                if (cell == null) return string.Empty;

                // Shared string lookup
                if (cell.DataType?.Value == CellValues.SharedString)
                {
                    if (sst == null) return cell.InnerText;
                    if (int.TryParse(cell.InnerText, out int ssIndex) && ssIndex < sst.Count())
                    {
                        return sst.ElementAt(ssIndex).InnerText;
                    }
                    return cell.InnerText;
                }

                // Inline string <is><t>…</t></is>
                if (cell.InnerText != null)
                    return cell.InnerText;

                return string.Empty;
            }

            private static uint GetColumnIndex(string cellRef)
            {
                // e.g. "C12" -> 3  (A=1, B=2, …)
                uint colIndex = 0;
                foreach (char ch in cellRef)
                {
                    if (char.IsLetter(ch))
                    {
                        colIndex = colIndex * 26 + (uint)(char.ToUpperInvariant(ch) - 'A' + 1);
                    }
                    else break;
                }
                return colIndex;
            }

            private static string Escape(string value)
            {
                if (string.IsNullOrEmpty(value)) return string.Empty;
                bool needsQuotes = value.Contains(',') || value.Contains('"') || value.Contains('\n');
                if (!needsQuotes) return value;

                return $"\"{value.Replace("\"", "\"\"")}\"";
            }
        }

    }
}
