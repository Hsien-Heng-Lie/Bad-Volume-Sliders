CREATE DATABASE [BVS]

USE [BVS]
GO
/****** Object:  Table [dbo].[AudioDetail]    Script Date: 2023/05/12 16:30:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AudioDetail](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](255) NOT NULL,
	[Artist] [varchar](255) NOT NULL,
 CONSTRAINT [PK_AudioDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AudioFIle]    Script Date: 2023/05/12 16:30:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AudioFIle](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[FileName] [varchar](255) NOT NULL,
	[Path] [varchar](255) NOT NULL,
 CONSTRAINT [PK_AudioFIle] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AudioLink]    Script Date: 2023/05/12 16:30:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AudioLink](
	[AudioDetailId] [bigint] NULL,
	[AudioFileId] [bigint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VolumeSlider]    Script Date: 2023/05/12 16:30:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VolumeSlider](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](500) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VolumeSliderClicks]    Script Date: 2023/05/12 16:30:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VolumeSliderClicks](
	[VolumeSliderId] [bigint] NOT NULL,
	[Clicks] [bigint] NOT NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[AudioDetail] ON 
GO
INSERT [dbo].[AudioDetail] ([Id], [Title], [Artist]) VALUES (1, N'Green Tea', N'Purrple Cat; ')
GO
SET IDENTITY_INSERT [dbo].[AudioDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[AudioFIle] ON 
GO
INSERT [dbo].[AudioFIle] ([Id], [FileName], [Path]) VALUES (1, N'purrple-cat-green-tea.mp3', N'\Music')
GO
SET IDENTITY_INSERT [dbo].[AudioFIle] OFF
GO
INSERT [dbo].[AudioLink] ([AudioDetailId], [AudioFileId]) VALUES (1, 1)
GO
SET IDENTITY_INSERT [dbo].[VolumeSlider] ON 
GO
INSERT [dbo].[VolumeSlider] ([Id], [Name]) VALUES (1, N'Test')
GO
INSERT [dbo].[VolumeSlider] ([Id], [Name]) VALUES (2, N'TEST2')
GO
INSERT [dbo].[VolumeSlider] ([Id], [Name]) VALUES (3, N'KYLE')
GO
SET IDENTITY_INSERT [dbo].[VolumeSlider] OFF
GO
INSERT [dbo].[VolumeSliderClicks] ([VolumeSliderId], [Clicks]) VALUES (1, 5)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_VolumeSlider]    Script Date: 2023/05/12 16:30:42 ******/
ALTER TABLE [dbo].[VolumeSlider] ADD  CONSTRAINT [UQ_VolumeSlider] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[VolumeSliderClicks] ADD  CONSTRAINT [DF_VolumeSliderClicks_Clicks]  DEFAULT ((0)) FOR [Clicks]
GO
ALTER TABLE [dbo].[AudioLink]  WITH CHECK ADD  CONSTRAINT [FK_AudioLink_AudioDetail] FOREIGN KEY([AudioDetailId])
REFERENCES [dbo].[AudioDetail] ([Id])
GO
ALTER TABLE [dbo].[AudioLink] CHECK CONSTRAINT [FK_AudioLink_AudioDetail]
GO
ALTER TABLE [dbo].[AudioLink]  WITH CHECK ADD  CONSTRAINT [FK_AudioLink_AudioFIle] FOREIGN KEY([AudioFileId])
REFERENCES [dbo].[AudioFIle] ([Id])
GO
ALTER TABLE [dbo].[AudioLink] CHECK CONSTRAINT [FK_AudioLink_AudioFIle]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpsertVolumeSlider]    Script Date: 2023/05/12 16:30:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpsertVolumeSlider] 
	@Name VARCHAR(500) 
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @RowCount INT = 0;
	SELECT 
		@RowCount = COUNT([Name])
	FROM dbo.VolumeSlider
	WHERE [Name] = @Name
	GROUP BY [Name]

	SELECT @RowCount

	IF @RowCount = 0
		BEGIN
			INSERT INTO [dbo].[VolumeSlider]
					   ([Name])
				 VALUES
					   (@Name)

			INSERT INTO [dbo].[VolumeSliderClicks] 
				(
				VolumeSliderId, 
				Clicks
				)
			SELECT 
				vs.Id, 
				1
			FROM [dbo].[VolumeSlider] AS vs
			WHERE vs.[Name] = @Name
		
		END
	ELSE
		BEGIN
	   		MERGE INTO [VolumeSliderClicks] AS vsc
				USING (SELECT Id, [Name] FROM [dbo].[VolumeSlider]) AS src
					ON src.Id =  vsc.VolumeSliderId
					AND src.[Name] = @Name
			WHEN MATCHED THEN
				UPDATE 
					SET Clicks = Clicks + 1
			;
		END

END
GO

CREATE TABLE [dbo].[VolumeSliderReview](
	[VolumeSliderId] [bigint] NOT NULL,
	[Date] [datetime] NOT NULL,
	[Review] [varchar](500) NOT NULL,
	[Rating] [decimal](1, 0) NOT NULL
) ON [PRIMARY]
GO